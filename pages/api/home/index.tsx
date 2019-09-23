import { NextApiRequest, NextApiResponse } from "next";
import { catchError } from "../../../api/helpers";
import { loadCourses, loadProgrammes, loadSubjects } from "../../../api/load";

import seedrandom from "seedrandom";

import { startOfDay } from "date-fns";

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const programmes = loadProgrammes();
    const courses = loadCourses();
    const subjects = loadSubjects();

    const now = new Date();
    const seed = (+startOfDay(now) + 1).toString();

    const rnd = seedrandom(seed);

    const courseSelection = new Set<any>();
    while (courseSelection.size < 3) {
      courseSelection.add(courses[Math.floor(courses.length * rnd())]);
    }

    const subjectSelection = new Set<any>();
    while (subjectSelection.size < 3) {
      subjectSelection.add(subjects[Math.floor(subjects.length * rnd())]);
    }

    const programSelection = new Set<any>();
    while (programSelection.size < 3) {
      programSelection.add(programmes[Math.floor(programmes.length * rnd())]);
    }

    res.status(200).json({
      courses: [...courseSelection].map(el => ({
        code: el.code,
        title: el.title
      })),
      subjects: [...subjectSelection].map(el => ({
        code: el.code,
        title: el.title
      })),
      programmes: [...programSelection].map(el => ({
        code: el.code,
        title: el.title
      }))
    });
  } catch (err) {
    catchError(err, req, res);
  }
};
