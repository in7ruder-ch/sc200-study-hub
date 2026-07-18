import posthog from "posthog-js";

type ProductAnalyticsEvents = {
  learning_path_opened: {
    locale: string;
    path_id: string;
    source: "dashboard" | "learning_paths";
  };
  module_opened: {
    locale: string;
    path_id: string;
    module_id: string;
  };
  unit_completed: {
    locale: string;
    path_id: string;
    module_id: string;
    unit_id: string;
    completed_units: number;
    total_units: number;
  };
  lab_started: {
    locale: string;
    lab_id: string;
    stage_count: number;
  };
  lab_stage_completed: {
    locale: string;
    lab_id: string;
    stage_id: string;
    stage_number: number;
    rating: "recommended" | "acceptable" | "risky";
  };
  lab_completed: {
    locale: string;
    lab_id: string;
    stage_count: number;
    recommended_decisions: number;
  };
  exam_started: {
    locale: string;
    mode: "quick" | "full";
    question_count: number;
  };
  exam_completed: {
    locale: string;
    mode: "quick" | "full";
    question_count: number;
    correct_answers: number;
    score_percentage: number;
  };
  study_reference_opened: {
    locale: string;
    source: "exam_blueprint" | "practice_lab";
    path_id: string;
    module_id: string;
    context_id: string;
  };
};

export function captureProductEvent<EventName extends keyof ProductAnalyticsEvents>(
  event: EventName,
  properties: ProductAnalyticsEvents[EventName],
) {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;
  posthog.capture(event, { ...properties, schema_version: 1 });
}
