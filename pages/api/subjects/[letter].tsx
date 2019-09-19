import { NextApiRequest, NextApiResponse } from "next";
import { isNotFoundError, catchError, sendError } from "../../../api/helpers";
import { getAllSubjectsData } from "../../../api/allSubjects";

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = getAllSubjectsData((req.query.letter as string).toLowerCase());
    res.status(200).json(data);
  } catch (err) {
    if (isNotFoundError(err)) {
      return sendError(
        res,
        404,
        `Subjects starting on the letter  '${req.query.letter}' was not found`
      );
    } else {
      catchError(err, req, res);
    }
  }
};
