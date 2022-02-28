import { loadSubjects, loadCourses } from "./load";

export function getSearchData() {
  // const programmes = loadProgrammes();
  const subjects = loadSubjects();
  const courses = loadCourses();

  return [
    // ...programmes.map((el) => ({
    //   type: "program",
    //   title: el.title,
    //   code: el.code,
    // })),
    ...subjects.map((el) => ({
      type: "subject",
      title: el.title,
      code: el.code,
    })),
    ...courses.map((el) => ({
      type: "course",
      title: el.title,
      code: el.code,
    })),
  ];
}

export type SearchData = ReturnType<typeof getSearchData>;
