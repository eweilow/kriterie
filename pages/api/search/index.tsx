import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getSearchData } from "../../../api/search";

function search(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(getSearchData());
}

export default withSentry(search);
