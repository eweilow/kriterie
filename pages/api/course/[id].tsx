import { NextApiRequest, NextApiResponse } from "next";
import { getCourseData } from "../../../api/course";
import { isNotFoundError, sendError, catchError } from "../../../api/helpers";

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = getCourseData((req.query.id as string).toLowerCase());
    res.status(200).json(data);
  } catch (err) {
    if (isNotFoundError(err)) {
      return sendError(
        res,
        404,
        `Course with id '${req.query.id}' was not found`
      );
    } else {
      catchError(err, req, res);
    }
  }
};
