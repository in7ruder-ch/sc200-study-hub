"use client";

import { useEffect, useMemo, useState } from "react";
import { getPracticeLabs } from "@/content/localization/content";
import { copy } from "@/lib/i18n";
import { localPracticeProgressRepository } from "@/lib/progress/practice-repository";
import type { PracticeLabProgress } from "@/lib/progress/practice-repository";
import type { LearningPath, Locale, PracticeDecisionRating, PracticeEvidence, PracticeLabScenario, PracticeStudyReference } from "@/lib/types";

function validStoredAnswers(lab: PracticeLabScenario, stored: Record<string, string>) {
  const answers: Record<string, string> = {};
  for (const stage of lab.stages) {
    const optionId = stored[stage.id];
    if (stage.decision.options.some((option) => option.id === optionId)) answers[stage.id] = optionId;
  }
  return answers;
}

export function PracticeLabView({ locale, learningPaths, selectedLabId, onSelectLab, onOpenReference }: { locale: Locale; learningPaths: LearningPath[]; selectedLabId: string | null; onSelectLab: (labId: string | null) => void; onOpenReference: (reference: PracticeStudyReference, stageId: string, stageTitle: string) => void }) {
  const t = copy[locale];
  const practiceLabs = useMemo(() => getPracticeLabs(locale), [locale]);
  const lab = practiceLabs.find((candidate) => candidate.id === selectedLabId);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [catalogProgress, setCatalogProgress] = useState<Record<string, PracticeLabProgress>>({});
  const [visibleHints, setVisibleHints] = useState<Set<string>>(new Set());
  const [confirmingReset, setConfirmingReset] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (!lab) {
        setCatalogProgress(Object.fromEntries(practiceLabs.map((candidate) => [candidate.id, localPracticeProgressRepository.loadLab(candidate.id)])));
        setStarted(false);
        setAnswers({});
        setVisibleHints(new Set());
        setConfirmingReset(false);
        return;
      }
      const stored = localPracticeProgressRepository.loadLab(lab.id);
      setStarted(stored.started);
      setAnswers(validStoredAnswers(lab, stored.answers));
      setVisibleHints(new Set());
      setConfirmingReset(false);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [lab, practiceLabs]);

  const completedStages = useMemo(() => lab?.stages.filter((stage) => Boolean(answers[stage.id])).length ?? 0, [answers, lab]);
  const completionPercentage = lab ? Math.round((completedStages / lab.stages.length) * 100) : 0;
  const labComplete = Boolean(lab && completedStages === lab.stages.length);

  const ratingLabels: Record<PracticeDecisionRating, string> = {
    recommended: t.practiceRecommended,
    acceptable: t.practiceAcceptable,
    risky: t.practiceRisky,
  };
  const evidenceCategoryLabels: Record<PracticeEvidence["category"], string> = {
    incident: t.practiceCategoryIncident,
    email: t.practiceCategoryEmail,
    identity: t.practiceCategoryIdentity,
    cloud: t.practiceCategoryCloud,
    device: t.practiceCategoryDevice,
    hunting: t.practiceCategoryHunting,
  };

  if (!lab) {
    const totalStages = practiceLabs.reduce((total, candidate) => total + candidate.stages.length, 0);
    const answeredStages = practiceLabs.reduce((total, candidate) => total + candidate.stages.filter((stage) => Boolean(catalogProgress[candidate.id]?.answers[stage.id])).length, 0);
    const ratingCounts: Record<PracticeDecisionRating, number> = { recommended: 0, acceptable: 0, risky: 0 };
    for (const candidate of practiceLabs) {
      const progress = catalogProgress[candidate.id];
      for (const stage of candidate.stages) {
        const selectedOptionId = progress?.answers[stage.id];
        const selectedOption = stage.decision.options.find((option) => option.id === selectedOptionId);
        if (selectedOption) ratingCounts[selectedOption.rating] += 1;
      }
    }
    const overallPercentage = totalStages ? Math.round((answeredStages / totalStages) * 100) : 0;
    const recommendedPercentage = answeredStages ? Math.round((ratingCounts.recommended / answeredStages) * 100) : 0;
    const completedLabs = practiceLabs.filter((candidate) => {
      const progress = catalogProgress[candidate.id];
      return candidate.stages.every((stage) => Boolean(progress?.answers[stage.id]));
    }).length;
    const activeLabs = practiceLabs.filter((candidate) => catalogProgress[candidate.id]?.started && !candidate.stages.every((stage) => Boolean(catalogProgress[candidate.id]?.answers[stage.id]))).length;

    return <section className="practice-catalog" aria-labelledby="practice-catalog-title">
      <header className="practice-catalog-hero">
        <div><p className="eyebrow">{t.practiceCatalogEyebrow}</p><h1 id="practice-catalog-title">{t.practiceCatalogTitle}</h1><p>{t.practiceCatalogBody}</p></div>
        <div className="practice-catalog-summary"><span><strong>{practiceLabs.length}</strong>{t.practiceAvailable}</span><span><strong>{activeLabs}</strong>{t.practiceInProgress}</span><span><strong>{completedLabs}</strong>{t.practiceStatusCompletedPlural}</span></div>
      </header>
      <section className="practice-insights" aria-labelledby="practice-insights-title">
        <header>
          <div><p className="eyebrow">{t.practiceSnapshotEyebrow}</p><h2 id="practice-insights-title">{t.practiceSnapshotTitle}</h2></div>
          <p>{t.practiceSnapshotBody}</p>
        </header>
        <div className="practice-insight-grid">
          <article>
            <span>{t.practiceStagesCompleted}</span>
            <strong>{answeredStages}<small>/{totalStages}</small></strong>
            <div className="practice-insight-track" role="progressbar" aria-label={t.practiceStagesCompleted} aria-valuemin={0} aria-valuemax={totalStages} aria-valuenow={answeredStages}><span style={{ width: `${overallPercentage}%` }} /></div>
          </article>
          <article>
            <span>{t.practiceRecommendedDecisions}</span>
            <strong>{recommendedPercentage}<small>%</small></strong>
            <p>{ratingCounts.recommended} {t.practiceOf} {answeredStages} {t.practiceDecisionsReviewed.toLowerCase()}</p>
          </article>
          <article>
            <span>{t.practiceLabsCompleted}</span>
            <strong>{completedLabs}<small>/{practiceLabs.length}</small></strong>
            <p>{activeLabs ? `${activeLabs} ${t.practiceInProgress.toLowerCase()}` : t.practiceNoActiveLabs}</p>
          </article>
        </div>
        <div className="practice-quality">
          <div><h3>{t.practiceDecisionQuality}</h3><span>{answeredStages} {t.practiceDecisionsReviewed.toLowerCase()}</span></div>
          {answeredStages ? <>
            <div className="practice-quality-bar" role="img" aria-label={`${t.practiceDecisionQuality}: ${ratingCounts.recommended} ${t.practiceRecommended}, ${ratingCounts.acceptable} ${t.practiceAcceptable}, ${ratingCounts.risky} ${t.practiceRisky}`}>
              <span className="recommended" style={{ width: `${(ratingCounts.recommended / answeredStages) * 100}%` }} />
              <span className="acceptable" style={{ width: `${(ratingCounts.acceptable / answeredStages) * 100}%` }} />
              <span className="risky" style={{ width: `${(ratingCounts.risky / answeredStages) * 100}%` }} />
            </div>
            <div className="practice-quality-legend"><span className="recommended"><i />{t.practiceRecommended}<strong>{ratingCounts.recommended}</strong></span><span className="acceptable"><i />{t.practiceAcceptable}<strong>{ratingCounts.acceptable}</strong></span><span className="risky"><i />{t.practiceRisky}<strong>{ratingCounts.risky}</strong></span></div>
          </> : <p className="practice-quality-empty">{t.practiceNoDecisions}</p>}
        </div>
      </section>
      <div className="practice-catalog-grid">
        {practiceLabs.map((candidate, index) => {
          const progress = catalogProgress[candidate.id];
          const done = candidate.stages.filter((stage) => Boolean(progress?.answers[stage.id])).length;
          const percentage = Math.round((done / candidate.stages.length) * 100);
          const complete = done === candidate.stages.length;
          const status = complete ? t.practiceStatusCompleted : progress?.started ? t.practiceInProgress : t.practiceNotStarted;
          const action = complete ? t.practiceReviewLab : progress?.started ? t.practiceContinueLab : t.practiceOpenLab;
          return <article className="practice-catalog-card" key={candidate.id}>
            <header><span>{String(index + 1).padStart(2, "0")}</span><em>{status}</em></header>
            <div><p className="eyebrow">{candidate.primaryDomain}</p><h2>{candidate.title}</h2><p>{candidate.subtitle}</p></div>
            <dl><div><dt>{t.practiceDifficulty}</dt><dd>{candidate.difficulty}</dd></div><div><dt>{t.practiceEstimatedTime}</dt><dd>{candidate.estimatedMinutes} min</dd></div><div><dt>{t.practiceStages}</dt><dd>{candidate.stages.length}</dd></div></dl>
            <div className="practice-catalog-products">{candidate.products.map((product) => <span key={product}>{product}</span>)}</div>
            <div className="practice-card-progress"><div><span>{t.practiceProgress}</span><strong>{done}/{candidate.stages.length}</strong></div><div><span style={{ width: `${percentage}%` }} /></div></div>
            <button type="button" onClick={() => onSelectLab(candidate.id)}>{action} →</button>
          </article>;
        })}
      </div>
    </section>;
  }

  const activeLab = lab;

  function startLab() {
    setStarted(true);
    localPracticeProgressRepository.saveLab(activeLab.id, { started: true, answers });
  }

  function selectAnswer(stageId: string, optionId: string) {
    setAnswers((current) => {
      const next = { ...current, [stageId]: optionId };
      localPracticeProgressRepository.saveLab(activeLab.id, { started: true, answers: next });
      return next;
    });
  }

  function toggleHint(stageId: string) {
    setVisibleHints((current) => {
      const next = new Set(current);
      if (next.has(stageId)) next.delete(stageId); else next.add(stageId);
      return next;
    });
  }

  function continueTo(stageId: string) {
    document.getElementById(stageId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetLab() {
    localPracticeProgressRepository.clearLab(activeLab.id);
    setStarted(false);
    setAnswers({});
    setVisibleHints(new Set());
    setConfirmingReset(false);
    document.getElementById("practice-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="practice-view" aria-labelledby="practice-title">
      <button className="practice-catalog-back" type="button" onClick={() => onSelectLab(null)}>← {t.practiceBackToCatalog}</button>
      <header className="practice-hero">
        <div>
          <p className="eyebrow">{t.practiceEyebrow}</p>
          <h1 id="practice-title">{activeLab.title}</h1>
          <p>{activeLab.subtitle}</p>
        </div>
        {started && <div className="practice-progress" aria-label={`${t.practiceProgress}: ${completionPercentage}%`}>
          <div><span>{t.practiceProgress}</span><strong>{completedStages}/{activeLab.stages.length}</strong></div>
          <div className="practice-progress-track"><span style={{ width: `${completionPercentage}%` }} /></div>
        </div>}
      </header>

      <div className="practice-meta">
        <span><small>{t.practiceDifficulty}</small>{activeLab.difficulty}</span>
        <span><small>{t.practiceEstimatedTime}</small>{activeLab.estimatedMinutes} min</span>
        <span><small>{t.practicePrimaryDomain}</small>{activeLab.primaryDomain}</span>
      </div>

      <section className="practice-briefing">
        <div><p className="eyebrow">{t.practiceScenario}</p><p>{activeLab.briefing}</p></div>
        <div><p className="eyebrow">{t.practiceMission}</p><p>{activeLab.mission}</p></div>
        <div className="practice-products"><p className="eyebrow">{t.practiceProducts}</p><div>{activeLab.products.map((product) => <span key={product}>{product}</span>)}</div></div>
      </section>

      {!started ? (
        <section className="practice-start">
          <div><span>01</span><div><h2>{t.practiceReadyTitle}</h2><p>{t.practiceReadyBody}</p></div></div>
          <button type="button" onClick={startLab}>{t.practiceStart} →</button>
        </section>
      ) : (
        <>
          <div className="practice-toolbar">
            <p>{activeLab.stages.length} {t.practiceStages} · {completedStages} {t.practiceCompleted}</p>
            {!confirmingReset ? <button type="button" onClick={() => setConfirmingReset(true)}>{t.practiceReset}</button> : <div className="practice-reset-confirm" role="group" aria-label={t.practiceResetPrompt}><span>{t.practiceResetPrompt}</span><button type="button" onClick={() => setConfirmingReset(false)}>{t.practiceCancel}</button><button type="button" onClick={resetLab}>{t.practiceConfirmReset}</button></div>}
          </div>

          <div className="practice-stages">
            {activeLab.stages.map((stage, stageIndex) => {
              const previousStage = activeLab.stages[stageIndex - 1];
              const unlocked = stageIndex === 0 || Boolean(answers[previousStage.id]);
              const selectedOptionId = answers[stage.id];
              const selectedOption = stage.decision.options.find((option) => option.id === selectedOptionId);
              const nextStage = activeLab.stages[stageIndex + 1];
              const hintVisible = visibleHints.has(stage.id);

              if (!unlocked) return (
                <section className="practice-stage locked" id={stage.id} key={stage.id} aria-label={`${t.practiceStage} ${stage.number}: ${stage.title}`}>
                  <header><span>{String(stage.number).padStart(2, "0")}</span><div><p>{t.practiceStage}</p><h2>{stage.title}</h2></div><strong>🔒</strong></header>
                  <p>{t.practiceLockedBody}</p>
                </section>
              );

              return (
                <section className={`practice-stage ${selectedOption ? "answered" : ""}`} id={stage.id} key={stage.id}>
                  <header><span>{String(stage.number).padStart(2, "0")}</span><div><p>{t.practiceStage}</p><h2>{stage.title}</h2><small>{stage.objective}</small></div>{selectedOption && <strong>✓</strong>}</header>
                  <div className="practice-stage-body">
                    <p className="practice-stage-briefing">{stage.briefing}</p>

                    <section className="practice-evidence" aria-labelledby={`${stage.id}-evidence`}>
                      <div className="practice-section-title"><span>{t.practiceEvidence}</span><small>{stage.evidence.length}</small></div>
                      <div className="practice-evidence-grid">
                        {stage.evidence.map((evidence) => <details key={evidence.id}><summary><span>{evidenceCategoryLabels[evidence.category]}</span><strong>{evidence.title}</strong></summary><ul>{evidence.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul></details>)}
                      </div>
                    </section>

                    <section className="practice-decision" aria-labelledby={`${stage.id}-decision`}>
                      <div className="practice-section-title"><span>{t.practiceDecision}</span></div>
                      <h3 id={`${stage.id}-decision`}>{stage.decision.prompt}</h3>
                      <div className="practice-options">
                        {stage.decision.options.map((option) => {
                          const selected = option.id === selectedOptionId;
                          return <button type="button" className={selected ? `selected rating-${option.rating}` : ""} aria-pressed={selected} onClick={() => selectAnswer(stage.id, option.id)} key={option.id}><span className="practice-option-marker" aria-hidden="true" /><span>{option.text}</span>{selected && <strong>{ratingLabels[option.rating]}</strong>}</button>;
                        })}
                      </div>
                    </section>

                    <button className="practice-hint-toggle" type="button" onClick={() => toggleHint(stage.id)} aria-expanded={hintVisible}>{hintVisible ? t.practiceHideHint : t.practiceShowHint}</button>
                    {hintVisible && <aside className="practice-hint"><strong>{t.practiceHint}</strong><p>{stage.hint}</p></aside>}

                    {selectedOption && <div className="practice-feedback" aria-live="polite">
                      <section className={`practice-feedback-summary rating-${selectedOption.rating}`}><strong>{ratingLabels[selectedOption.rating]}</strong><p>{selectedOption.feedback}</p></section>
                      <section><h3>{t.practiceOutcome}</h3><ul>{stage.outcome.map((item) => <li key={item}>{item}</li>)}</ul></section>
                      <section className="practice-takeaway"><h3>{t.practiceTakeaway}</h3><p>{stage.takeaway}</p></section>
                      <details className="practice-references" key={`${stage.id}-${selectedOption.id}`} open={selectedOption.rating !== "recommended" || undefined}>
                        <summary><span><strong>{t.practiceReferences}</strong><small>{t.practiceReferencesIntro}</small></span><em>{stage.references.length}</em></summary>
                        <div>
                          {stage.references.map((reference) => {
                            const path = learningPaths.find((candidate) => candidate.id === reference.pathId);
                            const studyModule = path?.modules.find((candidate) => candidate.id === reference.moduleId);
                            if (!path || !studyModule) return null;
                            return <button type="button" onClick={() => onOpenReference(reference, stage.id, stage.title)} key={`${reference.pathId}-${reference.moduleId}`}><span><small>{path.title}</small><strong>{studyModule.title}</strong><p>{reference.reason}</p></span><em>{t.practiceOpenReference} →</em></button>;
                          })}
                        </div>
                      </details>
                      {nextStage && <button className="practice-continue" type="button" onClick={() => continueTo(nextStage.id)}>{t.practiceContinue} →</button>}
                    </div>}
                  </div>
                </section>
              );
            })}
          </div>

          {labComplete && <section className="practice-debrief" aria-labelledby="practice-debrief-title">
            <p className="eyebrow">{t.practiceComplete}</p>
            <h2 id="practice-debrief-title">{activeLab.debrief.title}</h2>
            <p>{activeLab.debrief.summary}</p>
            <h3>{t.practiceKeyLessons}</h3>
            <ul>{activeLab.debrief.keyLessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul>
          </section>}
        </>
      )}
    </section>
  );
}
