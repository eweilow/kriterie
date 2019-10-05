import { NextApiRequest, NextApiResponse } from "next";
import { getSubjectData } from "../../../api/subject";
import { isNotFoundError, catchError, sendError } from "../../../api/helpers";

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = getSubjectData((req.query.id as string).toLowerCase());
    res.status(200).json(data);
  } catch (err) {
    if (isNotFoundError(err)) {
      return sendError(res, 404, err.message);
    } else {
      catchError(err, req, res);
    }
  }
};
