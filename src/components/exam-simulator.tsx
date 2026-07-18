"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { getExamQuestions } from "@/content/localization/content";
import { captureProductEvent } from "@/lib/analytics";
import { copy } from "@/lib/i18n";
import { localExamAttemptRepository, type ExamAttempt, type ExamMode } from "@/lib/progress/exam-repository";
import type { ExamQuestion, LearningPath, Locale } from "@/lib/types";

function shuffled<T>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function selectQuestions(questions: ExamQuestion[], mode: ExamMode) {
  if (mode === "full") return shuffled(questions);
  const domainIds = ["bp-domain-1", "bp-domain-2", "bp-domain-3"] as const;
  return shuffled(domainIds.flatMap((domainId) => shuffled(questions.filter((question) => question.domainId === domainId)).slice(0, 2)));
}

function buildAttempt(mode: ExamMode, questions: ExamQuestion[], answers: Record<string, string>): ExamAttempt {
  const domainScores: ExamAttempt["domainScores"] = {};
  let score = 0;
  for (const question of questions) {
    const correct = answers[question.id] === question.correctOptionId;
    if (correct) score += 1;
    const current = domainScores[question.domainId] ?? { correct: 0, total: 0 };
    domainScores[question.domainId] = { correct: current.correct + (correct ? 1 : 0), total: current.total + 1 };
  }
  return {
    id: `exam-attempt-${Date.now()}`,
    mode,
    completedAt: new Date().toISOString(),
    questionIds: questions.map((question) => question.id),
    answers,
    score,
    total: questions.length,
    domainScores,
  };
}

export function ExamSimulatorView({ locale, learningPaths, onBack }: { locale: Locale; learningPaths: LearningPath[]; onBack: () => void }) {
  const t = copy[locale];
  const allQuestions = useMemo(() => getExamQuestions(locale), [locale]);
  const [mode, setMode] = useState<ExamMode | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [result, setResult] = useState<ExamAttempt | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => setAttempts(localExamAttemptRepository.load()), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActiveQuestions((current) => current.map((question) => allQuestions.find((candidate) => candidate.id === question.id) ?? question));
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [allQuestions]);

  function start(nextMode: ExamMode) {
    const selectedQuestions = selectQuestions(allQuestions, nextMode);
    setMode(nextMode);
    setActiveQuestions(selectedQuestions);
    setCurrentIndex(0);
    setAnswers({});
    setRevealed(new Set());
    setResult(null);
    setError("");
    captureProductEvent("exam_started", { locale, mode: nextMode, question_count: selectedQuestions.length });
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
  }

  function selectAnswer(questionId: string, optionId: string) {
    if (revealed.has(questionId)) return;
    setAnswers((current) => ({ ...current, [questionId]: optionId }));
    setError("");
  }

  function revealCurrent() {
    const question = activeQuestions[currentIndex];
    if (!answers[question.id]) {
      setError(t.examAnswerRequired);
      return;
    }
    setRevealed((current) => new Set(current).add(question.id));
  }

  function moveTo(index: number) {
    const question = activeQuestions[currentIndex];
    if (mode === "quick" && !revealed.has(question.id)) {
      setError(t.examAnswerRequired);
      return;
    }
    setCurrentIndex(index);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finish() {
    if (activeQuestions.some((question) => !answers[question.id])) {
      setError(t.examAnswerRequired);
      const firstUnanswered = activeQuestions.findIndex((question) => !answers[question.id]);
      if (firstUnanswered >= 0) setCurrentIndex(firstUnanswered);
      return;
    }
    const completed = buildAttempt(mode ?? "full", activeQuestions, answers);
    localExamAttemptRepository.save(completed);
    setAttempts(localExamAttemptRepository.load());
    setResult(completed);
    setError("");
    captureProductEvent("exam_completed", {
      locale,
      mode: completed.mode,
      question_count: completed.total,
      correct_answers: completed.score,
      score_percentage: Math.round((completed.score / completed.total) * 100),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function referenceLabel(question: ExamQuestion, pathId: string, moduleId: string) {
    const path = learningPaths.find((candidate) => candidate.id === pathId);
    const studyModule = path?.modules.find((candidate) => candidate.id === moduleId);
    return `${path?.title ?? pathId} · ${studyModule?.title ?? moduleId} · ${question.references.find((reference) => reference.pathId === pathId && reference.moduleId === moduleId)?.reason ?? ""}`;
  }

  if (result) {
    const percentage = Math.round((result.score / result.total) * 100);
    return <section className="exam-simulator exam-results" aria-labelledby="exam-results-title">
      <button className="practice-catalog-back" type="button" onClick={onBack}>← {t.examBackToPractice}</button>
      <header className="exam-results-hero">
        <div><p className="eyebrow">{t.examCompleted}</p><h1 id="exam-results-title">{t.examScore}: {percentage}%</h1><p>{result.score}/{result.total} {t.examQuestions}</p></div>
        <div className="exam-score-ring" style={{ "--score": `${percentage * 3.6}deg` } as CSSProperties}><span>{percentage}%</span></div>
      </header>
      <section className="exam-domain-results" aria-labelledby="exam-domain-results-title">
        <h2 id="exam-domain-results-title">{t.examDomainPerformance}</h2>
        <div>{Object.entries(result.domainScores).map(([domainId, domainScore]) => {
          const domainQuestion = activeQuestions.find((question) => question.domainId === domainId);
          const domainPercentage = Math.round((domainScore.correct / domainScore.total) * 100);
          return <article key={domainId}><span>{domainQuestion?.domainTitle ?? domainId}</span><strong>{domainScore.correct}/{domainScore.total}</strong><div><i style={{ width: `${domainPercentage}%` }} /></div></article>;
        })}</div>
      </section>
      <section className="exam-review" aria-labelledby="exam-review-title">
        <h2 id="exam-review-title">{t.examReviewAnswers}</h2>
        {activeQuestions.map((question, index) => {
          const selected = result.answers[question.id];
          const correct = selected === question.correctOptionId;
          return <article id={question.id} className={correct ? "correct" : "incorrect"} key={question.id}>
            <header><span>{String(index + 1).padStart(2, "0")}</span><div><small>{question.domainTitle}</small><h3>{question.prompt}</h3></div><strong>{correct ? t.examCorrect : t.examIncorrect}</strong></header>
            <div className="exam-review-options">{question.options.map((option) => <p className={`${option.id === question.correctOptionId ? "correct" : ""} ${option.id === selected && !correct ? "selected-wrong" : ""}`} key={option.id}><span>{option.id.toUpperCase()}</span>{option.text}</p>)}</div>
            <section><h4>{t.examExplanation}</h4><p>{question.explanation}</p></section>
            <section><h4>{t.examReferences}</h4><ul>{question.references.map((reference) => <li key={`${reference.pathId}-${reference.moduleId}`}>{referenceLabel(question, reference.pathId, reference.moduleId)}</li>)}</ul></section>
          </article>;
        })}
      </section>
      <div className="exam-result-actions"><button type="button" onClick={() => start(result.mode)}>{t.examTryAgain}</button><button type="button" onClick={onBack}>{t.examBackToPractice}</button></div>
    </section>;
  }

  if (mode && activeQuestions.length) {
    const question = activeQuestions[currentIndex];
    const selectedOptionId = answers[question.id];
    const isRevealed = mode === "quick" && revealed.has(question.id);
    const isCorrect = selectedOptionId === question.correctOptionId;
    const answeredCount = activeQuestions.filter((candidate) => answers[candidate.id]).length;
    return <section className="exam-simulator exam-session" aria-labelledby="exam-question-title">
      <button className="practice-catalog-back" type="button" onClick={() => setMode(null)}>← {t.examBackToPractice}</button>
      <header className="exam-session-header">
        <div><p className="eyebrow">{mode === "quick" ? t.examQuickMode : t.examFullMode}</p><strong>{t.examQuestion} {currentIndex + 1} {t.examOf} {activeQuestions.length}</strong></div>
        <span>{answeredCount}/{activeQuestions.length} {t.examAnswered}</span>
        <div role="progressbar" aria-label={`${answeredCount} ${t.examAnswered}`} aria-valuemin={0} aria-valuemax={activeQuestions.length} aria-valuenow={answeredCount}><i style={{ width: `${(answeredCount / activeQuestions.length) * 100}%` }} /></div>
      </header>
      <article className="exam-question-card">
        <header><span>{String(currentIndex + 1).padStart(2, "0")}</span><div><small>{question.domainTitle}</small><h1 id="exam-question-title">{question.prompt}</h1></div></header>
        <div className="exam-options" role="radiogroup" aria-labelledby="exam-question-title">{question.options.map((option) => {
          const selected = selectedOptionId === option.id;
          const optionCorrect = option.id === question.correctOptionId;
          const stateClass = isRevealed ? optionCorrect ? "correct" : selected ? "incorrect" : "" : selected ? "selected" : "";
          return <button type="button" role="radio" aria-checked={selected} disabled={isRevealed} className={stateClass} onClick={() => selectAnswer(question.id, option.id)} key={option.id}><span>{option.id.toUpperCase()}</span><strong>{option.text}</strong></button>;
        })}</div>
        {isRevealed && <section className={`exam-inline-feedback ${isCorrect ? "correct" : "incorrect"}`} aria-live="polite"><strong>{isCorrect ? t.examCorrect : t.examIncorrect}</strong><h2>{t.examExplanation}</h2><p>{question.explanation}</p><h3>{t.examReferences}</h3><ul>{question.references.map((reference) => <li key={`${reference.pathId}-${reference.moduleId}`}>{referenceLabel(question, reference.pathId, reference.moduleId)}</li>)}</ul></section>}
      </article>
      {error && <p className="exam-error" role="alert">{error}</p>}
      <footer className="exam-navigation">
        <button type="button" disabled={currentIndex === 0} onClick={() => moveTo(currentIndex - 1)}>{t.examPrevious}</button>
        <details className="exam-question-map"><summary>{t.examQuestionMap} · {answeredCount}/{activeQuestions.length}</summary><div>{activeQuestions.map((candidate, index) => <button type="button" className={`${index === currentIndex ? "active" : ""} ${answers[candidate.id] ? "answered" : ""}`} aria-label={`${t.examQuestion} ${index + 1}`} onClick={() => moveTo(index)} key={candidate.id}>{index + 1}</button>)}</div></details>
        {mode === "quick" && !isRevealed ? <button type="button" onClick={revealCurrent}>{t.examCheck}</button> : currentIndex < activeQuestions.length - 1 ? <button type="button" onClick={() => moveTo(currentIndex + 1)}>{t.examNext}</button> : <button type="button" onClick={finish}>{t.examFinish}</button>}
      </footer>
    </section>;
  }

  return <section className="exam-simulator exam-intro" aria-labelledby="exam-simulator-title">
    <button className="practice-catalog-back" type="button" onClick={onBack}>← {t.examBackToPractice}</button>
    <header><p className="eyebrow">{t.examSimulatorEyebrow}</p><h1 id="exam-simulator-title">{t.examSimulatorTitle}</h1><p>{t.examSimulatorBody}</p><small>{t.examSimulatorNotice}</small></header>
    <div className="exam-mode-grid">
      <article><span>01</span><h2>{t.examQuickTitle}</h2><p>{t.examQuickBody}</p><strong>{t.examQuickMeta}</strong><button type="button" onClick={() => start("quick")}>{t.examStart} →</button></article>
      <article><span>02</span><h2>{t.examFullTitle}</h2><p>{t.examFullBody}</p><strong>{t.examFullMeta}</strong><button type="button" onClick={() => start("full")}>{t.examStart} →</button></article>
    </div>
    <section className="exam-history" aria-labelledby="exam-history-title"><h2 id="exam-history-title">{t.examRecentAttempts}</h2>{attempts.length ? <div>{attempts.slice(0, 5).map((attempt) => <article key={attempt.id}><span>{attempt.mode === "quick" ? t.examQuickMode : t.examFullMode}</span><strong>{Math.round((attempt.score / attempt.total) * 100)}%</strong><small>{attempt.score}/{attempt.total} · {new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(attempt.completedAt))}</small></article>)}</div> : <p>{t.examNoAttempts}</p>}</section>
  </section>;
}
