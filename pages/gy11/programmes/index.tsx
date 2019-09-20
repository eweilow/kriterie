import { NextPage } from "next";
import { wrappedInitialProps, fetchAndParseJson } from "../../../lib/notFound";
import { getSafeUrl } from "../../../lib/safeUrl";

type Props = { data: any };
const Page: NextPage<Props> = props => (
  <>
    <h1>all programmes??</h1>
    <pre>{JSON.stringify(props.data, null, "  ")}</pre>
  </>
);

Page.getInitialProps = wrappedInitialProps<Props>(async ctx => {
  const url = getSafeUrl(`/api/programmes`, ctx.req);
  const data = await fetchAndParseJson("Programmes not found", url);
  return {
    data
  };
});

export default Page;