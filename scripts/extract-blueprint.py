from __future__ import annotations

import html
import json
import re
from pathlib import Path


SOURCE = Path(
    r"C:\Users\vanar\.codex\visualizations\2026\07\15\019f6621-adae-7731-87e7-1a5fd7d07469\sc-200-defender-xdr-study-notes.html"
)
OUTPUT = Path(__file__).parents[1] / "src" / "content" / "exam-blueprint.json"


def text(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


source = SOURCE.read_text(encoding="utf-8")
blueprint = source[source.index('<section id="blueprint-view"') : source.index('<section id="learning-view"')]
map_source = source[source.index("const coverageMap = [") : source.index("const coverageTitles")]

mappings = []
for status, refs_source in re.findall(r"\{\s*status:\s*'(\w+)',\s*refs:\s*\[(.*?)\]\s*\}", map_source, re.S):
    refs = [
        {"pathId": path_id, "moduleId": module_id}
        for path_id, module_id in re.findall(r"studyRef\('([^']+)',\s*'([^']+)'", refs_source)
    ]
    mappings.append({"status": status, "references": refs})

domain_matches = list(re.finditer(r'<section class="blueprint-domain"[^>]*>', blueprint))
domains = []
objective_index = 0

for domain_index, match in enumerate(domain_matches):
    end = domain_matches[domain_index + 1].start() if domain_index + 1 < len(domain_matches) else len(blueprint)
    domain_html = blueprint[match.start() : end]
    header = re.search(r'<header class="blueprint-domain-header">(.*?)</header>', domain_html, re.S)
    if not header:
        continue
    header_html = header.group(1)
    number = text(re.search(r'<span class="domain-index"[^>]*>(.*?)</span>', header_html, re.S).group(1))
    title = text(re.search(r'<h2[^>]*>(.*?)</h2>', header_html, re.S).group(1))
    title = re.sub(r"^Domain\s+\d+:\s*", "", title)
    description = text(re.search(r'<p>(.*?)</p>', header_html, re.S).group(1))
    weight_text = text(re.search(r'<strong>(.*?)</strong>', header_html, re.S).group(1))
    weight = weight_text.split("·")[0].strip()

    groups = []
    for group_index, group_match in enumerate(re.finditer(r'<details class="blueprint-group">(.*?)</details>', domain_html, re.S)):
        group_html = group_match.group(1)
        summary = re.search(r'<summary>(.*?)</summary>', group_html, re.S).group(1)
        group_title = text(re.search(r'<span>(.*?)</span>', summary, re.S).group(1))
        objectives = []
        for item in re.findall(r'<li>(.*?)</li>', group_html, re.S):
            mapping = mappings[objective_index]
            objectives.append(
                {
                    "id": f"bp-objective-{objective_index + 1}",
                    "text": text(item),
                    "status": mapping["status"],
                    "references": mapping["references"],
                }
            )
            objective_index += 1
        groups.append(
            {
                "id": f"bp-domain-{domain_index + 1}-group-{group_index + 1}",
                "title": group_title,
                "objectives": objectives,
            }
        )

    domains.append(
        {
            "id": f"bp-domain-{domain_index + 1}",
            "number": number,
            "title": title,
            "description": description,
            "weight": weight,
            "groups": groups,
        }
    )

payload = {
    "title": "SC-200 Exam Blueprint",
    "effectiveDate": "July 28, 2026",
    "officialUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-200",
    "domains": domains,
}

if objective_index != len(mappings):
    raise RuntimeError(f"Parsed {objective_index} objectives but found {len(mappings)} coverage mappings")

OUTPUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"Wrote {len(domains)} domains, {sum(len(domain['groups']) for domain in domains)} groups, and {objective_index} objectives to {OUTPUT}")
