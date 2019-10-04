import { loadSubjectData, loadCourseData } from "./load";
import { getSortableCode } from "./course";

export function getSubjectData(id: string) {
  const subject = loadSubjectData(id);
  const data = {
    title: subject.title,
    code: subject.code,
    description: subject.description,
    purposes: subject.developmentPurposes.map(
      el => el[0].toLocaleUpperCase() + el.slice(1)
    ),
    courses: subject.courses.map(code => {
      const course = loadCourseData(code);

      return {
        title: course.title,
        code: course.code,
        points: course.points
      };
    }),
    rest: subject
  };
  data.courses.sort((a: any, b: any) =>
    getSortableCode(a.code).localeCompare(getSortableCode(b.code))
  );

  return data;
}
