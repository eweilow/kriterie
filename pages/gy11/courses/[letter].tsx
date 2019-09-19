import { NextPage } from "next";
import { wrappedInitialProps, fetchAndParseJson } from "../../../lib/notFound";
import { getSafeUrl } from "../../../lib/safeUrl";

type Props = { data: any; letter: string };
const Page: NextPage<Props> = props => (
  <>
    <h1>all courses?? {props.letter}</h1>
    <pre>{JSON.stringify(props.data, null, "  ")}</pre>
  </>
);

Page.getInitialProps = wrappedInitialProps<Props>(async ctx => {
  const letter = (ctx.query.letter as string).toLowerCase();
  const url = getSafeUrl(`/api/courses/${letter}`, ctx.req);
  const data = await fetchAndParseJson("Courses not found", url);
  return {
    data,
    letter
  };
});

export default Page;
