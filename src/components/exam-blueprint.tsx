"use client";

import { useEffect, useMemo, useState } from "react";
import { getRemediationPacks } from "@/content/localization/content";
import type { RemediationPack } from "@/content/remediation-packs";
import { copy } from "@/lib/i18n";
import type { BlueprintReference, BlueprintReturnTarget, ExamBlueprint, LearningPath, Locale } from "@/lib/types";

export function ExamBlueprintView({
  blueprint,
  learningPaths,
  locale,
  onOpenReference,
  returnTarget,
  onReturnTargetRestored,
}: {
  blueprint: ExamBlueprint;
  learningPaths: LearningPath[];
  locale: Locale;
  onOpenReference: (reference: BlueprintReference, returnTarget: BlueprintReturnTarget) => void;
  returnTarget: BlueprintReturnTarget | null;
  onReturnTargetRestored: () => void;
}) {
  const t = copy[locale];
  const objectives = useMemo(() => blueprint.domains.flatMap((domain) => domain.groups.flatMap((group) => group.objectives)), [blueprint]);
  const packs = useMemo(() => new Map(getRemediationPacks(locale).map((pack) => [pack.objectiveId, pack])), [locale]);
  const [openGroupIds, setOpenGroupIds] = useState<Set<string>>(new Set());
  const [highlightedObjectiveId, setHighlightedObjectiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!returnTarget) return;
    let scrollTimeout: number | undefined;
    const restoreTimeout = window.setTimeout(() => {
      setOpenGroupIds(new Set([returnTarget.groupId]));
      setHighlightedObjectiveId(returnTarget.objectiveId);
      scrollTimeout = window.setTimeout(() => {
        const objective = document.getElementById(returnTarget.objectiveId);
        objective?.focus({ preventScroll: true });
        objective?.scrollIntoView({ behavior: "smooth", block: "center" });
        onReturnTargetRestored();
      }, 120);
    }, 0);
    return () => {
      window.clearTimeout(restoreTimeout);
      if (scrollTimeout !== undefined) window.clearTimeout(scrollTimeout);
    };
  }, [onReturnTargetRestored, returnTarget]);

  useEffect(() => {
    if (!highlightedObjectiveId) return;
    const timeout = window.setTimeout(() => setHighlightedObjectiveId(null), 2400);
    return () => window.clearTimeout(timeout);
  }, [highlightedObjectiveId]);

  function updateGroupState(groupId: string, open: boolean) {
    setOpenGroupIds((current) => {
      if (current.has(groupId) === open) return current;
      const next = new Set(current);
      if (open) next.add(groupId); else next.delete(groupId);
      return next;
    });
  }

  function referenceLabel(reference: BlueprintReference) {
    const path = learningPaths.find((item) => item.id === reference.pathId);
    const studyModule = path?.modules.find((item) => item.id === reference.moduleId);
    return `${path?.title ?? reference.pathId} — ${studyModule?.title ?? reference.moduleId}`;
  }

  function StudyPack({ pack }: { pack: RemediationPack }) {
    return (
      <details className="objective-study-pack">
        <summary><span>{t.studyPack}</span><small>{t.studyPackContents}</small></summary>
        <div className="study-pack-body">
          <section className="study-pack-brief"><h3>{t.studyBrief}</h3><p>{pack.summary}</p></section>
          <div className="study-pack-columns">
            <section><h3>{t.keyConcepts}</h3><ul>{pack.keyConcepts.map((concept) => <li key={concept}>{concept}</li>)}</ul></section>
            <section><h3>{t.examChecklist}</h3><ul>{pack.examChecklist.map((item) => <li key={item}>{item}</li>)}</ul></section>
          </div>
          <section className="study-pack-lab"><p className="eyebrow">{t.handsOnExercise}</p><h3>{pack.lab.title}</h3><ol>{pack.lab.steps.map((step) => <li key={step}>{step}</li>)}</ol></section>
          <section><h3>{t.officialResources}</h3><div className="objective-links">{pack.resources.map((resource) => <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}>{resource.title} ↗</a>)}</div></section>
        </div>
      </details>
    );
  }

  return (
    <section className="blueprint-view" aria-labelledby="blueprint-title">
      <header className="blueprint-hero">
        <div><p className="eyebrow">{t.officialObjectives}</p><h1 id="blueprint-title">{blueprint.title}</h1><p>{t.blueprintIntro}</p></div>
        <a className="official-link" href={blueprint.officialUrl} target="_blank" rel="noreferrer">{t.openOfficialBlueprint} ↗</a>
      </header>

      <div className="blueprint-meta"><span>{t.effective} {blueprint.effectiveDate}</span><span>{objectives.length} {t.objectives}</span><span>{blueprint.domains.length} {t.weightedDomains}</span></div>
      <p className="blueprint-guide">{t.blueprintGuide}</p>

      <div className="blueprint-domains">
        {blueprint.domains.map((domain, domainIndex) => {
          const domainObjectives = domain.groups.flatMap((group) => group.objectives);
          return (
            <section className={`blueprint-domain domain-${domainIndex + 1}`} key={domain.id}>
              <header className="blueprint-domain-header"><span>{domain.number}</span><div><h2>{domain.title}</h2><p>{domain.description}</p></div><strong>{domain.weight} · {domainObjectives.length} {t.objectives}</strong></header>
              <div className="blueprint-groups">
                {domain.groups.map((group) => (
                  <details className="blueprint-group" key={group.id} open={openGroupIds.has(group.id)} onToggle={(event) => {
                    if (event.target !== event.currentTarget) return;
                    updateGroupState(group.id, event.currentTarget.open);
                  }}>
                    <summary><span>{group.title}</span><strong>{group.objectives.length} {t.objectives}</strong></summary>
                    <div className="blueprint-objectives">
                      {group.objectives.map((objective) => {
                        const pack = packs.get(objective.id);
                        return (
                          <article id={objective.id} tabIndex={objective.id === highlightedObjectiveId ? -1 : undefined} className={`blueprint-objective ${pack ? "has-study-pack" : ""} ${objective.id === highlightedObjectiveId ? "return-target" : ""}`} key={objective.id}>
                            <p>{objective.text}</p>
                            {pack && <StudyPack pack={pack} />}
                            {objective.references.length > 0 && <section className="objective-foundation"><h3>{t.relatedStudyNotes}</h3><div className="objective-links">{objective.references.map((reference) => {
                              const label = referenceLabel(reference);
                              return <button type="button" key={`${objective.id}-${reference.pathId}-${reference.moduleId}`} onClick={() => onOpenReference(reference, { groupId: group.id, objectiveId: objective.id })} aria-label={`${t.openStudyNotes}: ${label}`}>{label}</button>;
                            })}</div></section>}
                          </article>
                        );
                      })}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
