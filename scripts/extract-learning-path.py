from __future__ import annotations

import argparse
import html
import json
import re
from pathlib import Path


SOURCE = Path(
    r"C:\Users\vanar\.codex\visualizations\2026\07\15\019f6621-adae-7731-87e7-1a5fd7d07469\sc-200-defender-xdr-study-notes.html"
)
OUTPUT_DIR = Path(__file__).parents[1] / "src" / "content"


def plain_text(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def extract(path_number: int) -> dict:
    source = SOURCE.read_text(encoding="utf-8")
    start = source.index(f'<section id="path-{path_number}"')
    next_marker = f'<section id="path-{path_number + 1}"'
    end = source.find(next_marker, start)
    path_html = source[start : end if end != -1 else len(source)]

    path_link = re.search(
        r'<a class="path-title-link" href="([^"]+)"[^>]*>(.*?)</a>', path_html, re.S
    )
    path_meta = re.search(r'<p class="path-meta">(.*?)</p>', path_html, re.S)
    focus_items = re.findall(
        r'<div class="objective"><strong>(.*?)</strong><br>(.*?)</div>', path_html, re.S
    )
    headings = list(
        re.finditer(r'<h2 id="([^"]*module-\d+)">(.*?)</h2>', path_html, re.S)
    )

    modules = []
    for index, heading in enumerate(headings):
        block_end = headings[index + 1].start() if index + 1 < len(headings) else len(path_html)
        block = path_html[heading.end() : block_end]
        details = list(re.finditer(r'<details\s+id="([^"]+)">(.*?)</details>', block, re.S))
        first_unit = details[0].start() if details else len(block)
        focus_match = re.search(r"<p>(.*?)</p>", block[:first_unit], re.S)
        units = []

        for unit in details:
            detail_html = unit.group(2)
            summary_match = re.search(r"<summary>(.*?)</summary>", detail_html, re.S)
            body_match = re.search(r'<div class="unit-body">(.*)</div>\s*$', detail_html, re.S)
            summary_html = summary_match.group(1) if summary_match else ""
            number_match = re.search(r'<span class="unit-no">(.*?)</span>', summary_html, re.S)
            title_html = re.sub(r'<span class="unit-no">.*?</span>', "", summary_html, flags=re.S)
            body = body_match.group(1).strip() if body_match else ""
            body = re.sub(r'<i\s+data-lucide="[^"]+"[^>]*></i>', "", body)

            units.append(
                {
                    "id": unit.group(1),
                    "number": plain_text(number_match.group(1)) if number_match else "",
                    "title": plain_text(title_html),
                    "bodyHtml": body,
                }
            )

        full_heading = plain_text(heading.group(2))
        title = re.sub(r"^Module\s+\d+\s*[·Â-]+\s*", "", full_heading)
        modules.append(
            {
                "id": heading.group(1),
                "number": index + 1,
                "title": title,
                "focus": plain_text(focus_match.group(1)) if focus_match else "",
                "units": units,
            }
        )

    link_text = plain_text(path_link.group(2)) if path_link else ""
    title = re.sub(r"^Learning path\s+\d+\s*[·Â-]+\s*", "", link_text)
    return {
        "id": f"path-{path_number}",
        "number": path_number,
        "title": title,
        "officialUrl": path_link.group(1) if path_link else "",
        "meta": plain_text(path_meta.group(1)) if path_meta else "",
        "focusAreas": [
            {"title": plain_text(item_title), "description": plain_text(description)}
            for item_title, description in focus_items
        ],
        "modules": modules,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("path_number", type=int)
    args = parser.parse_args()
    payload = extract(args.path_number)
    output = OUTPUT_DIR / f"learning-path-{args.path_number}.json"
    output.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    unit_count = sum(len(module["units"]) for module in payload["modules"])
    print(f"Wrote {len(payload['modules'])} modules and {unit_count} units to {output}")


if __name__ == "__main__":
    main()
