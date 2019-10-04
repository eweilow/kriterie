import { loadSubjectData, loadCourseData, loadProgrammes } from "./load";
import { getSortableCode } from "./course";

export function getSubjectData(id: string) {
  const subject = loadSubjectData(id);

  const applicableProgrammes: Array<{
    applicable: boolean;
    title: string;
    code: string;
  }> = [];
  for (const program of loadProgrammes()) {
    const courses = new Set([
      ...program.education.mandatory.courses,
      ...program.education.program.courses,
      ...program.education.specialization.courses,
      ...([] as string[]).concat(
        ...program.education.orientations.map(el => el.courses)
      ),
      ...([] as string[]).concat(
        ...program.education.professionalDegrees.map(el => el.courses)
      ),
      ...([] as string[]).concat(
        ...program.education.profiles.map(el => el.courses)
      )
    ]);

    applicableProgrammes.push({
      applicable: subject.courses.some(code => courses.has(code)),
      title: program.title,
      code: program.code
    });
  }

  applicableProgrammes.sort((a, b) => a.code.localeCompare(b.code));

  const data = {
    title: subject.title,
    code: subject.code,
    description: subject.description,
    purposes: subject.purposes.map(
      el => el[0].toLocaleUpperCase() + el.slice(1)
    ),
    developmentPurposes: subject.developmentPurposes.map(
      el => el[0].toLocaleUpperCase() + el.slice(1)
    ),
    applicableProgrammes,
    courses: subject.courses.map(code => {
      const course = loadCourseData(code);

      return {
        title: course.title,
        code: course.code,
        points: course.points
      };
    }),
    courseInfo: subject.courseInfo
    // rest: subject
  };
  data.courses.sort((a: any, b: any) =>
    getSortableCode(a.code).localeCompare(getSortableCode(b.code))
  );

  return data;
}
