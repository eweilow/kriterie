import { NextApiRequest, NextApiResponse } from "next";
import { isNotFoundError, sendError, catchError } from "../../../api/helpers";
import { getAllCoursesData } from "../../../api/allCourses";

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = getAllCoursesData((req.query.letter as string).toLowerCase());
    res.status(200).json(data);
  } catch (err) {
    if (isNotFoundError(err)) {
      return sendError(res, 404, err.message);
    } else {
      catchError(err, req, res);
    }
  }
};
