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

export function loadCourses(): any[] {
  const codes = Array.from(getCourseCodeToNameMapping().keys());
  return codes.map((el: any) => loadCourseData(el));
}

export function loadCourseData(id: string): any {
  const name = getCourseCodeToNameMapping().get(id.toLowerCase());
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

export function loadSubjects(): any[] {
  const codes = Array.from(getSubjectCodeToNameMapping().keys());
  return codes.map((el: any) => loadSubjectData(el));
}

export function loadSubjectData(id: string): any {
  const name = getSubjectCodeToNameMapping().get(id.toLowerCase());
  const data = require("@education-data/swedish-gymnasium/out/" + name);
  return data;
}

let programCodeToNameMappingCache: Map<string, string> | null = null;
function getProgramCodeToNameMapping() {
  if (programCodeToNameMappingCache != null) {
    return programCodeToNameMappingCache;
  }

  const map = new Map<string, string>();
  const programs = require("@education-data/swedish-gymnasium/out/programmes.json");

  for (const program of programs) {
    map.set(program.code.toLowerCase(), program.file.slice(2));
  }

  programCodeToNameMappingCache = map;
  return programCodeToNameMappingCache;
}

export function loadProgrammes(): any[] {
  const codes = Array.from(getProgramCodeToNameMapping().keys());
  return codes.map((el: any) => loadProgramData(el));
}

export function loadProgramData(id: string): any {
  const name = getProgramCodeToNameMapping().get(id.toLowerCase());
  const data = require("@education-data/swedish-gymnasium/out/" + name);
  return data;
}
