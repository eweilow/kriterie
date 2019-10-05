import { NextApiRequest, NextApiResponse } from "next";
import { catchError } from "../../../api/helpers";
import { getSearchData } from "../../../api/search";

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(getSearchData());
  } catch (err) {
    catchError(err, req, res);
  }
};
