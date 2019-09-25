import { NextApiRequest, NextApiResponse } from "next";
import { catchError } from "../../../api/helpers";
import { loadSubjects, loadProgrammes, loadCourses } from "../../../api/load";

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const programmes = loadProgrammes();
    const subjects = loadSubjects();
    const courses = loadCourses();
    res
      .status(200)
      .json([
        ...programmes.map(el => ({
          type: "program",
          title: el.title,
          code: el.code
        })),
        ...subjects.map(el => ({
          type: "subject",
          title: el.title,
          code: el.code
        })),
        ...courses.map(el => ({
          type: "course",
          title: el.title,
          code: el.code
        }))
      ]);
  } catch (err) {
    catchError(err, req, res);
  }
};
