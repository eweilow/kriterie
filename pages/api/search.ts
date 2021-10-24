import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getSearchData } from "../../src/api/search";

function search(req: NextApiRequest, res: NextApiResponse) {
  const data = getSearchData();
  res.status(200).json(data);
}

export default withSentry(search);
