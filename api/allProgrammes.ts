import { loadProgrammes } from "./load";
import { getSortableCode } from "./course";

export function getAllProgrammesData() {
  const programmes = loadProgrammes();

  const data = programmes.map((program: any) => ({
    title: program.title,
    code: program.code,
    typeOfProgram: program.typeOfProgram,
    typeOfSchooling: program.typeOfSchooling
  }));

  data.sort((a: any, b: any) =>
    getSortableCode(a.code).localeCompare(getSortableCode(b.code))
  );

  return { programmes: data };
}
