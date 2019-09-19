import { loadProgramData } from "./load";

export function getProgramData(id: string) {
  const program = loadProgramData(id);
  return {
    title: program.title,
    code: program.code,
    rest: program
  };
}
