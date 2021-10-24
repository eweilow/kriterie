import { loadProgrammes } from "./load";
import { getSortableCode } from "./course";

function getData() {
  const programmes = loadProgrammes();

  const data = programmes.map((program) => {
    let type: string;
    switch (program.typeOfProgram) {
      case "VOCATIONAL_PROGRAM":
        type = "Yrkes­förberedande program";
        break;
      case "PRELIMINARY_PROGRAM_FOR_HIGHER_EDUCATION":
        type = "Högskoleförberedande program";
        break;
      case "NATIONAL_RECRUITMENT_FOR_LOCAL_SPECIALIZATION":
        type = "Riksrekryterande program";
        break;
      case "INTERNATIONAL_BACCALAUREATE":
      case "INTRODUCTORY_PROGRAM":
      default:
        type = "Okänd programtyp";
        break;
    }

    return {
      title: program.title,
      code: program.code,
      type,
      typeOfProgram: program.typeOfProgram,
      typeOfSchooling: program.typeOfSchooling,
    };
  });

  data.sort((a: any, b: any) =>
    getSortableCode(a.code).localeCompare(getSortableCode(b.code))
  );

  return data;
}

type ArrayType<T> = T extends Array<infer U> ? U : never;

export function getAllProgrammesData() {
  const programmes = getData();

  const byType = new Map<string, ArrayType<typeof programmes>[]>();

  for (const programme of programmes) {
    if (!byType.has(programme.type)) {
      byType.set(programme.type, []);
    }
    byType.get(programme.type)!.push(programme);
  }

  const mapped = [...byType.keys()].map((type) => ({
    type,
    programmes: byType.get(type),
  }));

  mapped.sort((a, b) => a.type.localeCompare(b.type));

  return { programmes: mapped };
}
