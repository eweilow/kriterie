import { loadSubjects } from "./load";
import { throwNotFound } from "../lib/notFound";

export function getAllSubjectsData(letter: string) {
  const subjects = loadSubjects();

  const letters = Array.from(
    subjects.reduce<Set<string>>(
      (set, { title }) => set.add(title.toLowerCase()[0]),
      new Set<string>()
    )
  );
  letters.sort();

  if (!letters.includes(letter)) {
    throwNotFound(`There are no subjects starting with the letter '${letter}'`);
  }

  const data = subjects
    .filter((subject: any) => subject.title.toLowerCase().startsWith(letter))
    .map((subject: any) => ({
      title: subject.title,
      code: subject.code,
      // rest: subject
    }));

  data.sort((a: any, b: any) => a.code.localeCompare(b.code));

  return { subjects: data, letters };
}
