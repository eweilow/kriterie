import { loadCourseData, loadSubjectData } from "./load";

export function getSortableCode(code: string) {
  return code.replace("00S", "0S0");
}

export function getCourseData(id: string) {
  const course = loadCourseData(id);
  const subject = loadSubjectData(course.code.slice(0, 3));
  return {
    title: course.title,
    code: course.code,
    description: course.description,
    points: course.points,
    subject: {
      title: subject.title,
      code: subject.code
    },
    rest: course
  };
}
