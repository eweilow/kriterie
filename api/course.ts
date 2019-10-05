import { loadCourseData, loadSubjectData, loadProgrammes } from "./load";

export function getSortableCode(code: string) {
  return code.replace("00S", "0S0");
}

export function getCourseData(id: string) {
  const course = loadCourseData(id);
  const subject = loadSubjectData(course.code.slice(0, 3));

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
      applicable: courses.has(course.code),
      title: program.title,
      code: program.code
    });
  }

  applicableProgrammes.sort((a, b) => a.code.localeCompare(b.code));

  return {
    title: course.title,
    code: course.code,
    points: course.points,
    subject: {
      title: subject.title,
      code: subject.code
    },
    applicableProgrammes,
    subjectPurposes: subject.developmentPurposes.map((el, i) => {
      return {
        value: el,
        applicable: course.applicableSubjectPurposes.includes(i)
      };
    }),
    centralContent: course.centralContent,
    criteria: course.criteria.E.map((el, i) => ({
      E: course.criteria.E[i],
      C: course.criteria.C[i],
      A: course.criteria.A[i]
    }))
    // rest: course
  };
}
