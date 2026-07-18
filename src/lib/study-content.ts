import learningPathOne from "@/content/learning-path-1.json";
import learningPathTwo from "@/content/learning-path-2.json";
import learningPathThree from "@/content/learning-path-3.json";
import learningPathFour from "@/content/learning-path-4.json";
import learningPathFive from "@/content/learning-path-5.json";
import learningPathSix from "@/content/learning-path-6.json";
import learningPathSeven from "@/content/learning-path-7.json";
import learningPathEight from "@/content/learning-path-8.json";
import learningPathNine from "@/content/learning-path-9.json";
import examBlueprint from "@/content/exam-blueprint.json";
import type { ExamBlueprint, LearningPath } from "@/lib/types";

export const englishLearningPaths = [
  learningPathOne,
  learningPathTwo,
  learningPathThree,
  learningPathFour,
  learningPathFive,
  learningPathSix,
  learningPathSeven,
  learningPathEight,
  learningPathNine,
] as LearningPath[];

export const englishExamBlueprint = examBlueprint as ExamBlueprint;
