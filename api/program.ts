import { loadProgramData, loadSubjectData, loadCourseData } from "./load";

function mapSubjects(
  subjects: {
    code: string;
    minPoints: number | null;
    courses: string[];
  }[],
  calculateFreeChoice: boolean
) {
  return subjects
    .filter(el => el.code !== "ETT")
    .map(el => {
      const subjectData = loadSubjectData(el.code);

      const data = {
        title: subjectData.title,
        minPoints:
          calculateFreeChoice && el.minPoints != null ? el.minPoints : null,
        code: subjectData.code,
        freeChoice: 0,
        courses: el.courses.map(el2 => {
          const courseData = loadCourseData(el2);

          return {
            title: courseData.title,
            code: courseData.code,
            points: courseData.points
          };
        })
      };

      if (calculateFreeChoice) {
        const coursePoints = data.courses.reduce(
          (prev, curr) => prev + curr.points,
          0
        );

        data.freeChoice = Math.max(0, data.minPoints - coursePoints);
      }

      return data;
    });
}
export function getProgramData(id: string) {
  const program = loadProgramData(id);

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
    info: {
      degreeObjectives: program.info.degreeObjectives,
      educationObjectives: program.info.educationObjectives,
      orientation: {
        isOrientations: program.info.orientation.title === "Inriktningar",
        isProfiles: program.info.orientation.title === "Profiler",
        lines: program.info.orientation.lines
      }
    },
    education: {
      mandatory: mapSubjects(program.education.mandatory.subjects, true),
      program: mapSubjects(program.education.program.subjects, true),
      specialization: mapSubjects(
        program.education.specialization.subjects,
        false
      ),
      orientations: program.education.orientations.map(el => ({
        name: el.name,
        code: el.code,
        points: el.points,
        subjects: mapSubjects(el.subjects, true),
        aliasSubjects: el.aliasSubjects
      })),
      professionalDegrees: program.education.professionalDegrees.map(el => ({
        name: el.name,
        code: el.code,
        subjects: mapSubjects(el.subjects, false)
      })),
      profiles: program.education.profiles.map(el => ({
        name: el.name,
        code: el.code,
        points: el.points,
        subjects: mapSubjects(el.subjects, false)
      }))
    }
    // rest: program
  };
}
