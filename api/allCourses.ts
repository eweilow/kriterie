import { loadCourses } from "./load";
import { getSortableCode } from "./course";
import { throwNotFound } from "../lib/notFound";

export function getAllCoursesData(letter: string) {
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
    .filter((course: any) => course.title.toLowerCase().startsWith(letter))
    .map((course: any) => ({
      title: course.title,
      code: course.code
      // rest: course
    }));

  data.sort((a: any, b: any) =>
    getSortableCode(a.code).localeCompare(getSortableCode(b.code))
  );

  return { courses: data, letters };
}
