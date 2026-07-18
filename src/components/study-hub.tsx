"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { getPracticeLabs, localizeExamBlueprint, localizeLearningPaths } from "@/content/localization/content";
import { copy } from "@/lib/i18n";
import { captureProductEvent } from "@/lib/analytics";
import { localProgressRepository } from "@/lib/progress/repository";
import { studyRouteFromPathname, studyRoutePath, type StudyRoute } from "@/lib/study-routes";
import { ExamBlueprintView } from "@/components/exam-blueprint";
import { PracticeLabView } from "@/components/practice-lab";
import { DashboardView } from "@/components/dashboard";
import { ExamSimulatorView } from "@/components/exam-simulator";
import type { BlueprintReference, BlueprintReturnTarget, ExamBlueprint, LearningPath, Locale, PracticeStudyReference, StudyModule } from "@/lib/types";

type ThemeChoice = "system" | "light" | "dark";
type AppView = "dashboard" | "learning" | "blueprint" | "practice";
type PracticeReturnTarget = { stageId: string; stageTitle: string };

function NavIcon({ view }: { view: AppView }) {
  if (view === "dashboard") return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
  if (view === "learning") return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z" /><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z" /></svg>;
  if (view === "blueprint") return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3.5h6M8.5 9h7M8.5 13h7M8.5 17h4" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.75 3h10.5A2 2 0 0 0 19 18l-5-9V3" /><path d="M7.5 16h9" /></svg>;
}

function ThemeControl({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [theme, setTheme] = useState<ThemeChoice>("system");

  useEffect(() => {
    const saved = window.localStorage.getItem("sc200-theme-v1") as ThemeChoice | null;
    const initial = saved && ["system", "light", "dark"].includes(saved) ? saved : "system";
    document.documentElement.dataset.theme = initial;
    const update = window.setTimeout(() => setTheme(initial), 0);
    return () => window.clearTimeout(update);
  }, []);

  function updateTheme(next: ThemeChoice) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("sc200-theme-v1", next);
  }

  return <label className="control"><span>{t.theme}</span><select value={theme} onChange={(event) => updateTheme(event.target.value as ThemeChoice)}><option value="system">{t.system}</option><option value="light">{t.light}</option><option value="dark">{t.dark}</option></select></label>;
}

function LanguageControl({ locale, onChange }: { locale: Locale; onChange: (locale: Locale) => void }) {
  const pathname = usePathname();
  function updateLocale(next: Locale) {
    if (next === locale) return;
    const parts = pathname.split("/");
    parts[1] = next;
    onChange(next);
    document.documentElement.lang = next;
    const nextPath = parts.join("/") || `/${next}`;
    window.history.replaceState(null, "", `${nextPath}${window.location.search}${window.location.hash}`);
  }
  return <label className="control"><span>{copy[locale].language}</span><select value={locale} onChange={(event) => updateLocale(event.target.value as Locale)}><option value="en">English</option><option value="es">Español</option></select></label>;
}

function ProgressRing({ completed, total }: { completed: number; total: number }) {
  const percentage = total ? Math.round((completed / total) * 100) : 0;
  return <div className="progress-ring" style={{ "--progress": `${percentage * 3.6}deg` } as CSSProperties}><span>{percentage}%</span></div>;
}

function ModulePanel({ module, completed, onToggle, locale }: { module: StudyModule; completed: Set<string>; onToggle: (unitId: string) => void; locale: Locale }) {
  const t = copy[locale];
  const completedCount = module.units.filter((unit) => completed.has(unit.id)).length;
  return (
    <section className="module-panel" id={module.id}>
      <header className="module-heading">
        <div className="module-index">{String(module.number).padStart(2, "0")}</div>
        <div><p>{t.module} {module.number}</p><h2>{module.title}</h2>{module.focus && <span>{module.focus}</span>}</div>
        <strong>{completedCount}/{module.units.length}</strong>
      </header>
      <div className="unit-stack">
        {module.units.map((unit) => (
          <details className="study-unit" key={unit.id}>
            <summary>
              <span className="unit-number">{unit.number}</span><span className="unit-title">{unit.title}</span>
              <label className="unit-check" onClick={(event) => event.stopPropagation()}>
                <input type="checkbox" checked={completed.has(unit.id)} onChange={() => onToggle(unit.id)} aria-label={`${t.markComplete}: ${unit.title}`} />
                <span aria-hidden="true">✓</span>
              </label>
            </summary>
            <div className="unit-content" dangerouslySetInnerHTML={{ __html: unit.bodyHtml }} />
          </details>
        ))}
      </div>
    </section>
  );
}

export function StudyHub({ locale: initialLocale, learningPaths: sourceLearningPaths, blueprint: sourceBlueprint, initialRoute }: { locale: Locale; learningPaths: LearningPath[]; blueprint: ExamBlueprint; initialRoute: StudyRoute }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const learningPaths = useMemo(() => localizeLearningPaths(sourceLearningPaths, locale), [sourceLearningPaths, locale]);
  const blueprint = useMemo(() => localizeExamBlueprint(sourceBlueprint, locale), [sourceBlueprint, locale]);
  const practiceLabs = useMemo(() => getPracticeLabs(locale), [locale]);
  const t = copy[locale];
  const [currentRoute, setCurrentRoute] = useState<StudyRoute>(initialRoute);
  const [activeView, setActiveView] = useState<AppView>(initialRoute.view);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(initialRoute.view === "learning" ? initialRoute.pathId ?? null : null);
  const [selectedModules, setSelectedModules] = useState<Set<string>>(() => new Set(initialRoute.view === "learning" && initialRoute.moduleId ? [initialRoute.moduleId] : []));
  const [moduleToFocus, setModuleToFocus] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [pendingReference, setPendingReference] = useState<BlueprintReference | null>(() => initialRoute.view === "learning" && initialRoute.pathId && initialRoute.moduleId ? { pathId: initialRoute.pathId, moduleId: initialRoute.moduleId } : null);
  const [blueprintReturnTarget, setBlueprintReturnTarget] = useState<BlueprintReturnTarget | null>(null);
  const [practiceReturnTarget, setPracticeReturnTarget] = useState<PracticeReturnTarget | null>(null);
  const [activePracticeLabId, setActivePracticeLabId] = useState<string | null>(initialRoute.view === "practice" && initialRoute.experience === "labs" ? initialRoute.labId ?? null : null);
  const [practiceExperience, setPracticeExperience] = useState<"labs" | "exam">(initialRoute.view === "practice" ? initialRoute.experience : "labs");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale;
    const update = window.setTimeout(() => {
      setCompleted(new Set(localProgressRepository.load().completedUnitIds));
    }, 0);
    return () => window.clearTimeout(update);
  }, [locale]);

  useEffect(() => {
    const collapsed = window.localStorage.getItem("sc200-sidebar-collapsed-v1") === "true";
    const update = window.setTimeout(() => setSidebarCollapsed(collapsed), 0);
    return () => window.clearTimeout(update);
  }, []);

  useEffect(() => {
    function restoreRoute() {
      const route = studyRouteFromPathname(window.location.pathname);
      if (!route) return;
      setCurrentRoute(route);
      setActiveView(route.view);
      setSelectedPathId(route.view === "learning" ? route.pathId ?? null : null);
      setSelectedModules(new Set(route.view === "learning" && route.moduleId ? [route.moduleId] : []));
      setPendingReference(route.view === "learning" && route.pathId && route.moduleId ? { pathId: route.pathId, moduleId: route.moduleId } : null);
      setModuleToFocus(null);
      setPracticeExperience(route.view === "practice" ? route.experience : "labs");
      setActivePracticeLabId(route.view === "practice" && route.experience === "labs" ? route.labId ?? null : null);
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
    }
    window.addEventListener("popstate", restoreRoute);
    return () => window.removeEventListener("popstate", restoreRoute);
  }, []);

  useEffect(() => {
    const spanish = locale === "es";
    let title = spanish ? "Centro de estudio SC-200 | Rutas, laboratorios y simulador" : "SC-200 Study Hub | Learning Paths, Labs & Exam Practice";
    let description = spanish
      ? "Prepará Microsoft SC-200 con rutas bilingües, laboratorios de seguridad, cobertura del temario, seguimiento de progreso y un simulador de 50 preguntas."
      : "Prepare for Microsoft SC-200 with bilingual learning paths, guided security labs, exam blueprint coverage, progress tracking, and a 50-question simulator.";

    if (currentRoute.view === "learning") {
      const path = learningPaths.find((candidate) => candidate.id === currentRoute.pathId);
      const studyModule = path?.modules.find((candidate) => candidate.id === currentRoute.moduleId);
      if (studyModule && path) {
        title = `${studyModule.title} | SC-200 Study Hub`;
        description = studyModule.focus || (spanish ? `Estudiá ${studyModule.title} dentro de ${path.title} para preparar Microsoft SC-200.` : `Study ${studyModule.title} within ${path.title} while preparing for Microsoft SC-200.`);
      } else if (path) {
        title = `${path.title} | SC-200 Study Hub`;
        description = spanish ? `Explorá ${path.modules.length} módulos de ${path.title}, seguí tu progreso y conectá cada tema con el examen SC-200.` : `Explore ${path.modules.length} modules from ${path.title}, track progress, and connect each topic to the SC-200 exam.`;
      } else {
        title = spanish ? "Rutas de aprendizaje SC-200 | Study Hub" : "SC-200 Learning Paths | Study Hub";
        description = spanish ? "Estudiá las nueve rutas de aprendizaje SC-200 con 54 módulos, 404 unidades y seguimiento local del progreso." : "Study all nine SC-200 learning paths with 54 modules, 404 units, and local progress tracking.";
      }
    } else if (currentRoute.view === "blueprint") {
      title = spanish ? "Temario del examen SC-200 | Study Hub" : "SC-200 Exam Blueprint | Study Hub";
      description = spanish ? "Explorá los dominios ponderados, grupos funcionales y objetivos oficiales del examen SC-200 con referencias de estudio directas." : "Explore SC-200 weighted domains, functional groups, and official exam objectives with direct study references.";
    } else if (currentRoute.view === "practice" && currentRoute.experience === "exam") {
      title = spanish ? "Simulador de examen SC-200 | 50 preguntas" : "SC-200 Exam Simulator | 50 Questions";
      description = spanish ? "Practicá con un simulador bilingüe de 50 preguntas originales, resultados por dominio, explicaciones y referencias de estudio." : "Practice with a bilingual 50-question SC-200 simulator featuring domain scores, explanations, and study references.";
    } else if (currentRoute.view === "practice") {
      const lab = practiceLabs.find((candidate) => candidate.id === currentRoute.labId);
      title = lab ? `${lab.title} | SC-200 Practice Lab` : spanish ? "Laboratorios prácticos SC-200 | Study Hub" : "SC-200 Practice Labs | Study Hub";
      description = lab?.subtitle || (spanish ? "Desarrollá criterio de investigación con escenarios guiados de Defender XDR, Sentinel, Endpoint y seguridad cloud." : "Build investigation judgment through guided Defender XDR, Sentinel, Endpoint, and cloud security scenarios.");
    }

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const origin = canonical ? new URL(canonical.href).origin : window.location.origin;
    const routePath = studyRoutePath(locale, currentRoute);
    const absoluteUrl = `${origin}${routePath}`;
    document.title = title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", description);
    canonical?.setAttribute("href", absoluteUrl);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute("content", absoluteUrl);
    document.querySelector<HTMLMetaElement>('meta[property="og:locale"]')?.setAttribute("content", spanish ? "es_ES" : "en_US");
    document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.setAttribute("content", `${origin}/${locale}/opengraph-image`);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')?.setAttribute("content", `${origin}/${locale}/twitter-image`);
    document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach((link) => {
      const language = link.getAttribute("hreflang");
      const targetLocale: Locale = language === "es" ? "es" : "en";
      link.href = `${origin}${studyRoutePath(targetLocale, currentRoute)}`;
    });
  }, [currentRoute, learningPaths, locale, practiceLabs]);

  useEffect(() => {
    if (!selectedPathId) return;
    const alignSelectedPath = () => {
      const entry = document.getElementById(`path-entry-${selectedPathId}`);
      if (!entry) return;
      const topbar = document.querySelector<HTMLElement>(".topbar");
      const offset = (topbar?.getBoundingClientRect().height ?? 68) + 18;
      let absoluteTop = 0;
      let element: HTMLElement | null = entry;
      while (element) {
        absoluteTop += element.offsetTop;
        element = element.offsetParent as HTMLElement | null;
      }
      if (document.scrollingElement) document.scrollingElement.scrollTop = absoluteTop - offset;
    };
    const timeouts = [0, 120, 300, 600].map((delay) => window.setTimeout(alignSelectedPath, delay));
    return () => timeouts.forEach((timeout) => window.clearTimeout(timeout));
  }, [selectedPathId]);

  useEffect(() => {
    if (activeView !== "learning" || !pendingReference) return;
    const timeout = window.setTimeout(() => {
      document.getElementById(pendingReference.moduleId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingReference(null);
    }, 750);
    return () => window.clearTimeout(timeout);
  }, [activeView, pendingReference]);

  useEffect(() => {
    if (activeView !== "learning" || !moduleToFocus || !selectedModules.has(moduleToFocus)) return;
    const timeout = window.setTimeout(() => {
      document.getElementById(moduleToFocus)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setModuleToFocus((current) => current === moduleToFocus ? null : current);
    }, 50);
    return () => window.clearTimeout(timeout);
  }, [activeView, moduleToFocus, selectedModules]);

  useEffect(() => {
    if (activeView !== "practice" || !practiceReturnTarget) return;
    const timeout = window.setTimeout(() => {
      document.getElementById(practiceReturnTarget.stageId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setPracticeReturnTarget(null);
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [activeView, practiceReturnTarget]);

  const allUnits = useMemo(() => learningPaths.flatMap((path) => path.modules.flatMap((module) => module.units)), [learningPaths]);
  const completedCount = allUnits.filter((unit) => completed.has(unit.id)).length;
  const returnObjective = useMemo(() => blueprint.domains.flatMap((domain) => domain.groups).flatMap((group) => group.objectives).find((objective) => objective.id === blueprintReturnTarget?.objectiveId), [blueprint, blueprintReturnTarget]);
  const clearBlueprintReturnTarget = useCallback(() => setBlueprintReturnTarget(null), []);

  function pushRoute(route: StudyRoute) {
    setCurrentRoute(route);
    window.history.pushState(null, "", studyRoutePath(locale, route));
  }

  function toggleModule(id: string) {
    const opening = !selectedModules.has(id);
    setSelectedModules((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    setModuleToFocus(opening ? id : null);
    if (selectedPathId) {
      if (opening) captureProductEvent("module_opened", { locale, path_id: selectedPathId, module_id: id });
      pushRoute({ view: "learning", pathId: selectedPathId, moduleId: opening ? id : undefined });
    }
  }

  function toggleUnit(id: string) {
    const path = learningPaths.find((candidate) => candidate.modules.some((studyModule) => studyModule.units.some((unit) => unit.id === id)));
    const studyModule = path?.modules.find((candidate) => candidate.units.some((unit) => unit.id === id));
    const next = new Set(completed);
    const completing = !next.has(id);
    if (completing) next.add(id); else next.delete(id);
    localProgressRepository.save({ completedUnitIds: [...next] });
    setCompleted(next);
    if (completing && path && studyModule) {
      captureProductEvent("unit_completed", {
        locale,
        path_id: path.id,
        module_id: studyModule.id,
        unit_id: id,
        completed_units: next.size,
        total_units: allUnits.length,
      });
    }
  }

  function togglePath(id: string) {
    const opening = selectedPathId !== id;
    setSelectedPathId(opening ? id : null);
    setSelectedModules(new Set());
    setModuleToFocus(null);
    if (opening) captureProductEvent("learning_path_opened", { locale, path_id: id, source: "learning_paths" });
    pushRoute(opening ? { view: "learning", pathId: id } : { view: "learning" });
  }

  function openStudyReference(reference: BlueprintReference, returnTarget: BlueprintReturnTarget) {
    captureProductEvent("study_reference_opened", { locale, source: "exam_blueprint", path_id: reference.pathId, module_id: reference.moduleId, context_id: returnTarget.objectiveId });
    setBlueprintReturnTarget(returnTarget);
    setActiveView("learning");
    setSelectedPathId(reference.pathId);
    setSelectedModules(new Set([reference.moduleId]));
    setPendingReference(reference);
    pushRoute({ view: "learning", pathId: reference.pathId, moduleId: reference.moduleId });
  }

  function openPracticeReference(reference: PracticeStudyReference, stageId: string, stageTitle: string) {
    captureProductEvent("study_reference_opened", { locale, source: "practice_lab", path_id: reference.pathId, module_id: reference.moduleId, context_id: stageId });
    setBlueprintReturnTarget(null);
    setPracticeReturnTarget({ stageId, stageTitle });
    setActiveView("learning");
    setSelectedPathId(reference.pathId);
    setSelectedModules(new Set([reference.moduleId]));
    setPendingReference(reference);
    pushRoute({ view: "learning", pathId: reference.pathId, moduleId: reference.moduleId });
  }

  function openDashboardLearningPath(pathId: string) {
    captureProductEvent("learning_path_opened", { locale, path_id: pathId, source: "dashboard" });
    setBlueprintReturnTarget(null);
    setPracticeReturnTarget(null);
    setSelectedPathId(pathId);
    setSelectedModules(new Set());
    setActiveView("learning");
    pushRoute({ view: "learning", pathId });
  }

  function openDashboardPracticeLab(labId: string, stageId?: string, stageTitle?: string) {
    setBlueprintReturnTarget(null);
    setActivePracticeLabId(labId);
    setPracticeExperience("labs");
    setPracticeReturnTarget(stageId && stageTitle ? { stageId, stageTitle } : null);
    setActiveView("practice");
    pushRoute({ view: "practice", experience: "labs", labId });
  }

  function openDashboard() {
    setBlueprintReturnTarget(null);
    setPracticeReturnTarget(null);
    setActiveView("dashboard");
    pushRoute({ view: "dashboard" });
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
  }

  function openLearningPaths() {
    setActiveView("learning");
    pushRoute({ view: "learning", pathId: selectedPathId ?? undefined, moduleId: selectedModules.values().next().value });
  }

  function openBlueprint() {
    setPracticeReturnTarget(null);
    setActiveView("blueprint");
    pushRoute({ view: "blueprint" });
  }

  function openPracticeLabs() {
    setBlueprintReturnTarget(null);
    setPracticeExperience("labs");
    setActiveView("practice");
    pushRoute({ view: "practice", experience: "labs", labId: activePracticeLabId ?? undefined });
  }

  function openExamSimulator() {
    setBlueprintReturnTarget(null);
    setPracticeReturnTarget(null);
    setPracticeExperience("exam");
    setActiveView("practice");
    pushRoute({ view: "practice", experience: "exam" });
  }

  function selectPracticeLab(labId: string | null) {
    setActivePracticeLabId(labId);
    pushRoute({ view: "practice", experience: "labs", labId: labId ?? undefined });
  }

  function returnFromExam() {
    setPracticeExperience("labs");
    pushRoute({ view: "practice", experience: "labs", labId: activePracticeLabId ?? undefined });
  }

  function toggleSidebar() {
    setSidebarCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem("sc200-sidebar-collapsed-v1", String(next));
      return next;
    });
  }

  return (
    <div className={`app-frame ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <button className="sidebar-toggle" type="button" onClick={toggleSidebar} aria-label={sidebarCollapsed ? t.sidebarExpand : t.sidebarCollapse} aria-expanded={!sidebarCollapsed}><span aria-hidden="true">{sidebarCollapsed ? "›" : "‹"}</span></button>
      <aside className="sidebar">
        <div className="brand-lockup">
          <a className="brand" href={`/${locale}`}><span className="brand-mark">SC</span><span><strong>{t.product}</strong><small>{t.description}</small></span></a>
          <div className="brand-author">
            <p>Created by <strong>in7ruder</strong></p>
            <div><a href="https://www.linkedin.com/in/mvanarelli/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://in7ruder.com" target="_blank" rel="noreferrer">Website ↗</a></div>
          </div>
        </div>
        <nav aria-label={t.primaryNavigation}>
          <a href={studyRoutePath(locale, { view: "dashboard" })} className={`nav-item ${activeView === "dashboard" ? "active" : ""}`} onClick={(event) => { event.preventDefault(); openDashboard(); }} aria-current={activeView === "dashboard" ? "page" : undefined}><span>00</span>{t.dashboard}</a>
          <a href={studyRoutePath(locale, { view: "learning" })} className={`nav-item ${activeView === "learning" ? "active" : ""}`} onClick={(event) => { event.preventDefault(); openLearningPaths(); }} aria-current={activeView === "learning" ? "page" : undefined}><span>01</span>{t.learningPaths}</a>
          <a href={studyRoutePath(locale, { view: "blueprint" })} className={`nav-item ${activeView === "blueprint" ? "active" : ""}`} onClick={(event) => { event.preventDefault(); openBlueprint(); }} aria-current={activeView === "blueprint" ? "page" : undefined}><span>02</span>{t.blueprint}</a>
          <a href={studyRoutePath(locale, { view: "practice", experience: "labs" })} className={`nav-item ${activeView === "practice" ? "active" : ""}`} onClick={(event) => { event.preventDefault(); openPracticeLabs(); }} aria-current={activeView === "practice" ? "page" : undefined}><span>03</span>{t.practice}</a>
        </nav>
        <div className="sidebar-progress"><ProgressRing completed={completedCount} total={allUnits.length} /><div><strong>{completedCount} / {allUnits.length}</strong><span>{t.units} {t.complete}</span></div></div>
      </aside>

      <main>
        <header className="topbar"><div className="topbar-controls"><LanguageControl locale={locale} onChange={setLocale} /><ThemeControl locale={locale} /></div></header>
        <div className="content-shell" id="top">
          {activeView === "dashboard" ? <DashboardView locale={locale} learningPaths={learningPaths} completedUnitIds={completed} onOpenLearningPath={openDashboardLearningPath} onOpenPracticeLab={openDashboardPracticeLab} onOpenExamSimulator={openExamSimulator} /> : activeView === "learning" ? <>
          {blueprintReturnTarget && returnObjective && <button className="blueprint-return" type="button" onClick={openBlueprint}><span aria-hidden="true">←</span><span><strong>{t.backToExamObjective}</strong><small>{returnObjective.text}</small></span></button>}
          {practiceReturnTarget && <button className="blueprint-return practice-return" type="button" onClick={openPracticeLabs}><span aria-hidden="true">←</span><span><strong>{t.backToPracticeStage}</strong><small>{practiceReturnTarget.stageTitle}</small></span></button>}
          <section className="hero"><p className="eyebrow">{t.studyWorkspace}</p><h1>{t.heroTitle}</h1><p>{t.heroBody}</p></section>

          <section className="path-picker" aria-labelledby="path-picker-title">
            <div className="section-heading"><div><p className="eyebrow">{String(learningPaths.length).padStart(2, "0")} / 09</p><h2 id="path-picker-title">{t.choosePath}</h2></div><span>{completedCount}/{allUnits.length} {t.units}</span></div>
            <div className="path-list">
              {learningPaths.map((path) => {
                const active = selectedPathId === path.id;
                const pathUnits = path.modules.flatMap((module) => module.units);
                const done = pathUnits.filter((unit) => completed.has(unit.id)).length;
                return (
                  <div className={`path-entry ${active ? "expanded" : ""}`} id={`path-entry-${path.id}`} key={path.id}>
                    <a href={studyRoutePath(locale, { view: "learning", pathId: path.id })} className={`path-card ${active ? "selected" : ""}`} onClick={(event) => { event.preventDefault(); togglePath(path.id); }} aria-expanded={active}>
                      <span className="path-number">{String(path.number).padStart(2, "0")}</span><span><strong>{path.title}</strong><small>{path.meta}</small><em>{done}/{pathUnits.length} {t.units} {t.complete}</em></span><span className="path-action">{active ? "−" : "+"}</span>
                    </a>
                    {active && (
                      <section className="path-workspace">
                        <header className="path-overview"><div><a href={path.officialUrl} target="_blank" rel="noreferrer">{t.learningPathLabel} {String(path.number).padStart(2, "0")} · {path.title} ↗</a><p>{path.meta}</p></div><ProgressRing completed={done} total={pathUnits.length} /></header>
                        <section className="focus-card"><p className="eyebrow">{t.studyFocus}</p><div className="focus-grid">{path.focusAreas.map((area) => <div key={area.title}><strong>{area.title}</strong><p>{area.description}</p></div>)}</div></section>
                        {locale === "es" && <p className="language-note">{t.contentLanguage}</p>}
                        <section className="module-picker">
                          <div className="section-heading"><div><p className="eyebrow">{path.modules.length} {t.modules} · {pathUnits.length} {t.units}</p><h2>{t.selectModule}</h2><p>{t.selectModuleBody}</p></div></div>
                          <div className="module-grid">
                            {path.modules.map((module) => {
                              const moduleDone = module.units.filter((unit) => completed.has(unit.id)).length;
                              const moduleActive = selectedModules.has(module.id);
                              return <a href={studyRoutePath(locale, { view: "learning", pathId: path.id, moduleId: module.id })} key={module.id} className={`module-card ${moduleActive ? "selected" : ""}`} onClick={(event) => { event.preventDefault(); toggleModule(module.id); }} aria-expanded={moduleActive}><span>{String(module.number).padStart(2, "0")}</span><span><strong>{module.title}</strong><small>{moduleDone}/{module.units.length} {t.units}</small></span><span>{moduleActive ? "−" : "+"}</span></a>;
                            })}
                          </div>
                        </section>
                        <div className="selected-modules">{path.modules.filter((module) => selectedModules.has(module.id)).map((module) => <ModulePanel key={module.id} module={module} completed={completed} onToggle={toggleUnit} locale={locale} />)}</div>
                        <footer className="path-end"><span>{t.endOfPath}</span><strong>{path.title}</strong></footer>
                      </section>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {!selectedPathId && (
            <section className="empty-state"><span>⌁</span><div><h2>{t.noPathTitle}</h2><p>{t.noPathBody}</p></div></section>
          )}
          </> : activeView === "blueprint" ? <ExamBlueprintView blueprint={blueprint} learningPaths={learningPaths} locale={locale} onOpenReference={openStudyReference} returnTarget={blueprintReturnTarget} onReturnTargetRestored={clearBlueprintReturnTarget} /> : practiceExperience === "exam" ? <ExamSimulatorView locale={locale} learningPaths={learningPaths} onBack={returnFromExam} /> : <PracticeLabView locale={locale} learningPaths={learningPaths} selectedLabId={activePracticeLabId} onSelectLab={selectPracticeLab} onOpenReference={openPracticeReference} onOpenSimulator={openExamSimulator} />}
        </div>
      </main>
      <nav className="mobile-nav" aria-label={t.mobileNavigation}>
        <button type="button" className={activeView === "dashboard" ? "active" : ""} onClick={openDashboard} aria-current={activeView === "dashboard" ? "page" : undefined}><NavIcon view="dashboard" /><span>{t.dashboard}</span></button>
        <button type="button" className={activeView === "learning" ? "active" : ""} onClick={openLearningPaths} aria-current={activeView === "learning" ? "page" : undefined}><NavIcon view="learning" /><span>{t.learningPaths}</span></button>
        <button type="button" className={activeView === "blueprint" ? "active" : ""} onClick={openBlueprint} aria-current={activeView === "blueprint" ? "page" : undefined}><NavIcon view="blueprint" /><span>{t.blueprint}</span></button>
        <button type="button" className={activeView === "practice" ? "active" : ""} onClick={openPracticeLabs} aria-current={activeView === "practice" ? "page" : undefined}><NavIcon view="practice" /><span>{t.practice}</span></button>
      </nav>
      <a className="back-to-top" href="#top" aria-label={t.backToTop}>↑</a>
    </div>
  );
}
