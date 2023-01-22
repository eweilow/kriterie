import { throwNotFound } from "../lib/notFound";
import { CourseData, SubjectData } from "./types";

let courseCodeToNameMappingCache: Map<string, string> | null = null;
function getCourseCodeToNameMapping() {
  if (courseCodeToNameMappingCache != null) {
    return courseCodeToNameMappingCache;
  }

  const map = new Map<string, string>();
  const courses = require("@education-data/swedish-gymnasium/out/courses.json");

  for (const course of courses) {
    map.set(course.code.toLowerCase(), course.file.slice(2));
  }

  courseCodeToNameMappingCache = map;
  return courseCodeToNameMappingCache;
}

export function loadCourses(): CourseData[] {
  const codes = Array.from(getCourseCodeToNameMapping().keys());
  return codes.map((el: any) => loadCourseData(el));
}

export function loadCourseData(id: string): CourseData {
  const name = getCourseCodeToNameMapping().get(id.toLowerCase());
  if (name == null) {
    throwNotFound(`Course with id '${id}' could not be found`);
  }
  const data = require("@education-data/swedish-gymnasium/out/" + name);
  return data;
}

let subjectCodeToNameMappingCache: Map<string, string> | null = null;
function getSubjectCodeToNameMapping() {
  if (subjectCodeToNameMappingCache != null) {
    return subjectCodeToNameMappingCache;
  }

  const map = new Map<string, string>();
  const subjects = require("@education-data/swedish-gymnasium/out/subjects.json");

  for (const subject of subjects) {
    map.set(subject.code.toLowerCase(), subject.file.slice(2));
  }

  subjectCodeToNameMappingCache = map;
  return subjectCodeToNameMappingCache;
}

export function loadSubjects(): SubjectData[] {
  const codes = Array.from(getSubjectCodeToNameMapping().keys());
  return codes.map((el: any) => loadSubjectData(el));
}

export function loadSubjectData(id: string): SubjectData {
  const name = getSubjectCodeToNameMapping().get(id.toLowerCase());
  if (name == null) {
    throwNotFound(`Subject with id '${id}' could not be found`);
  }
  const data = require("@education-data/swedish-gymnasium/out/" + name);
  return data;
}
