import { NextApiRequest, NextApiResponse } from "next";
import { catchError } from "../../../api/helpers";
import { getAllProgrammesData } from "../../../api/allProgrammes";

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = getAllProgrammesData();
    res.status(200).json(data);
  } catch (err) {
    catchError(err, req, res);
  }
};
