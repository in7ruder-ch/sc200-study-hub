"use client";

import { useEffect, useMemo, useState } from "react";
import { getPracticeLabs } from "@/content/localization/content";
import { copy } from "@/lib/i18n";
import { localPracticeProgressRepository, type PracticeLabProgress } from "@/lib/progress/practice-repository";
import { localExamAttemptRepository, type ExamAttempt } from "@/lib/progress/exam-repository";
import type { LearningPath, Locale, PracticeDecisionRating } from "@/lib/types";

type ReviewRating = Exclude<PracticeDecisionRating, "recommended">;

type DashboardProps = {
  locale: Locale;
  learningPaths: LearningPath[];
  completedUnitIds: Set<string>;
  onOpenLearningPath: (pathId: string) => void;
  onOpenPracticeLab: (labId: string, stageId?: string, stageTitle?: string) => void;
  onOpenExamSimulator: () => void;
};

export function DashboardView({ locale, learningPaths, completedUnitIds, onOpenLearningPath, onOpenPracticeLab, onOpenExamSimulator }: DashboardProps) {
  const t = copy[locale];
  const practiceLabs = useMemo(() => getPracticeLabs(locale), [locale]);
  const [practiceProgress, setPracticeProgress] = useState<Record<string, PracticeLabProgress>>({});
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setPracticeProgress(Object.fromEntries(practiceLabs.map((lab) => [lab.id, localPracticeProgressRepository.loadLab(lab.id)])));
      setExamAttempts(localExamAttemptRepository.load());
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [practiceLabs]);

  const summary = useMemo(() => {
    const allUnits = learningPaths.flatMap((path) => path.modules.flatMap((module) => module.units));
    const totalStages = practiceLabs.reduce((total, lab) => total + lab.stages.length, 0);
    let completedStages = 0;
    const reviewItems: Array<{ labId: string; labTitle: string; stageId: string; stageNumber: number; stageTitle: string; rating: ReviewRating; feedback: string }> = [];

    for (const lab of practiceLabs) {
      const progress = practiceProgress[lab.id];
      for (const stage of lab.stages) {
        const selectedOptionId = progress?.answers[stage.id];
        if (!selectedOptionId) continue;
        completedStages += 1;
        const selectedOption = stage.decision.options.find((option) => option.id === selectedOptionId);
        if (selectedOption && selectedOption.rating !== "recommended") {
          reviewItems.push({ labId: lab.id, labTitle: lab.title, stageId: stage.id, stageNumber: stage.number, stageTitle: stage.title, rating: selectedOption.rating as ReviewRating, feedback: selectedOption.feedback });
        }
      }
    }

    reviewItems.sort((a, b) => (a.rating === b.rating ? 0 : a.rating === "risky" ? -1 : 1));
    return {
      totalUnits: allUnits.length,
      completedUnits: allUnits.filter((unit) => completedUnitIds.has(unit.id)).length,
      totalStages,
      completedStages,
      reviewItems,
    };
  }, [completedUnitIds, learningPaths, practiceLabs, practiceProgress]);

  const activeLab = practiceLabs.find((lab) => {
    const progress = practiceProgress[lab.id];
    return progress?.started && lab.stages.some((stage) => !progress.answers[stage.id]);
  });
  const nextLab = practiceLabs.find((lab) => lab.stages.some((stage) => !practiceProgress[lab.id]?.answers[stage.id]));
  const nextPath = learningPaths.find((path) => path.modules.flatMap((module) => module.units).some((unit) => !completedUnitIds.has(unit.id)));
  const learningPercentage = summary.totalUnits ? Math.round((summary.completedUnits / summary.totalUnits) * 100) : 0;
  const labPercentage = summary.totalStages ? Math.round((summary.completedStages / summary.totalStages) * 100) : 0;
  const ratingLabels: Record<ReviewRating, string> = { acceptable: t.practiceAcceptable, risky: t.practiceRisky };
  const latestExamAttempt = examAttempts[0];

  return <section className="dashboard-view" aria-labelledby="dashboard-title">
    <header className="dashboard-hero">
      <p className="eyebrow">{t.dashboardEyebrow}</p>
      <h1 id="dashboard-title">{t.dashboardTitle}</h1>
      <p>{t.dashboardBody}</p>
    </header>

    <section className="dashboard-metrics" aria-label={t.dashboardTitle}>
      <article>
        <span>{t.dashboardLearningProgress}</span>
        <strong>{learningPercentage}<small>%</small></strong>
        <p>{summary.completedUnits}/{summary.totalUnits} {t.dashboardUnitsCompleted}</p>
        <div role="progressbar" aria-label={t.dashboardLearningProgress} aria-valuemin={0} aria-valuemax={summary.totalUnits} aria-valuenow={summary.completedUnits}><span style={{ width: `${learningPercentage}%` }} /></div>
      </article>
      <article>
        <span>{t.dashboardLabProgress}</span>
        <strong>{labPercentage}<small>%</small></strong>
        <p>{summary.completedStages}/{summary.totalStages} {t.dashboardStagesCompleted}</p>
        <div role="progressbar" aria-label={t.dashboardLabProgress} aria-valuemin={0} aria-valuemax={summary.totalStages} aria-valuenow={summary.completedStages}><span style={{ width: `${labPercentage}%` }} /></div>
      </article>
      <article className={summary.reviewItems.length ? "attention" : "clear"}>
        <span>{t.dashboardNeedsReview}</span>
        <strong>{summary.reviewItems.length}</strong>
        <p>{t.dashboardDecisions}</p>
      </article>
    </section>

    <div className="dashboard-primary-grid">
      <section className="dashboard-review" aria-labelledby="dashboard-review-title">
        <header><div><p className="eyebrow">{String(summary.reviewItems.length).padStart(2, "0")} {t.dashboardDecisions}</p><h2 id="dashboard-review-title">{t.dashboardReviewTitle}</h2></div><p>{t.dashboardReviewBody}</p></header>
        {summary.reviewItems.length ? <div className="dashboard-review-list">
          {summary.reviewItems.map((item) => <article key={`${item.labId}-${item.stageId}`}>
            <div className="dashboard-review-index"><span>{String(item.stageNumber).padStart(2, "0")}</span><em className={`rating-${item.rating}`}>{ratingLabels[item.rating]}</em></div>
            <div><small>{item.labTitle}</small><h3>{item.stageTitle}</h3><p>{item.feedback}</p></div>
            <button type="button" onClick={() => onOpenPracticeLab(item.labId, item.stageId, item.stageTitle)}>{t.dashboardReviewDecision} →</button>
          </article>)}
        </div> : <div className="dashboard-review-empty"><span aria-hidden="true">✓</span><div><h3>{t.dashboardReviewEmptyTitle}</h3><p>{t.dashboardReviewEmptyBody}</p></div></div>}
      </section>

      <aside className="dashboard-continue" aria-labelledby="dashboard-continue-title">
        <p className="eyebrow">{t.dashboardContinueTitle}</p>
        <h2 id="dashboard-continue-title">{t.dashboardContinueTitle}</h2>
        <p>{t.dashboardContinueBody}</p>
        {activeLab ? <section>
          <small>{t.dashboardContinueLab}</small>
          <h3>{activeLab.title}</h3>
          <strong>{activeLab.stages.filter((stage) => Boolean(practiceProgress[activeLab.id]?.answers[stage.id])).length}/{activeLab.stages.length} {t.practiceStages}</strong>
          <button type="button" onClick={() => onOpenPracticeLab(activeLab.id)}>{t.practiceContinueLab} →</button>
        </section> : nextLab ? <section>
          <small>{t.dashboardStartLab}</small>
          <h3>{nextLab.title}</h3>
          <button type="button" onClick={() => onOpenPracticeLab(nextLab.id)}>{t.practiceOpenLab} →</button>
        </section> : <p className="dashboard-complete-note">{t.dashboardAllLabsComplete}</p>}
        {nextPath && <section>
          <small>{t.dashboardNextPath}</small>
          <h3>{nextPath.title}</h3>
          <strong>{nextPath.modules.flatMap((module) => module.units).filter((unit) => completedUnitIds.has(unit.id)).length}/{nextPath.modules.flatMap((module) => module.units).length} {t.units}</strong>
          <button type="button" onClick={() => onOpenLearningPath(nextPath.id)}>{t.dashboardOpenPath} →</button>
        </section>}
        <section className="dashboard-exam-entry"><small>{t.examSimulatorEyebrow}</small><h3>{t.examSimulator}</h3>{latestExamAttempt && <strong>{t.examLatestScore}: {Math.round((latestExamAttempt.score / latestExamAttempt.total) * 100)}%</strong>}<button type="button" onClick={onOpenExamSimulator}>{t.examOpenSimulator} →</button></section>
      </aside>
    </div>

    <section className="dashboard-coverage" aria-labelledby="dashboard-coverage-title">
      <header><div><p className="eyebrow">09 {t.learningPaths}</p><h2 id="dashboard-coverage-title">{t.dashboardCoverageTitle}</h2></div><p>{t.dashboardCoverageBody}</p></header>
      <div>{learningPaths.map((path) => {
        const units = path.modules.flatMap((module) => module.units);
        const done = units.filter((unit) => completedUnitIds.has(unit.id)).length;
        const percentage = units.length ? Math.round((done / units.length) * 100) : 0;
        return <button type="button" onClick={() => onOpenLearningPath(path.id)} key={path.id} aria-label={`${path.title}: ${done}/${units.length} ${t.units}`}>
          <span>{String(path.number).padStart(2, "0")}</span><strong>{path.title}</strong><em>{done}/{units.length}</em><span className="dashboard-coverage-track"><i style={{ width: `${percentage}%` }} /></span>
        </button>;
      })}</div>
    </section>
  </section>;
}
