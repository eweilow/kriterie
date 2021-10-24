import { loadCourses, loadSubjectData } from "./load";
import { getSortableCode } from "./course";
import { throwNotFound } from "../lib/notFound";

function getData(letter: string) {
  const courses = loadCourses();

  const letters = Array.from(
    courses.reduce<Set<string>>(
      (set, { title }) => set.add(title.toLowerCase()[0]),
      new Set<string>()
    )
  );
  letters.sort();

  if (!letters.includes(letter)) {
    throwNotFound(`There are no courses starting with the letter '${letter}'`);
  }

  const data = courses
    .filter((course) => course.title.toLowerCase().startsWith(letter))
    .map((course) => {
      return {
        data: {
          title: course.title,
          code: course.code,
          points: course.points,
        },
        subject: {
          code: course.subject,
        },
        // rest: course
      };
    });

  data.sort((a, b) =>
    getSortableCode(a.data.code).localeCompare(getSortableCode(b.data.code))
  );

  return { courses: data, letters };
}

type ArrayType<T> = T extends Array<infer U> ? U : never;

export function getAllCoursesData(letter: string) {
  const { courses, letters } = getData(letter);

  const byType = new Map<string, ArrayType<typeof courses>[]>();

  for (const course of courses) {
    if (!byType.has(course.subject.code)) {
      byType.set(course.subject.code, []);
    }
    byType.get(course.subject.code)!.push(course);
  }

  const mapped = [...byType.keys()].map((code) => {
    const subjectData = loadSubjectData(code);
    return {
      title: subjectData.title,
      code: subjectData.code,
      courses: byType.get(code).map((el) => el.data),
    };
  });

  mapped.sort((a, b) => a.title.localeCompare(b.title));

  return {
    subjects: mapped,
    letters,
  };
}
