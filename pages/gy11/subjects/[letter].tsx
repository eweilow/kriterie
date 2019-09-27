import { NextPage } from "next";
import { wrappedInitialProps, fetchAndParseJson } from "../../../lib/notFound";
import { getSafeUrl } from "../../../lib/safeUrl";
import { NextSeo } from "next-seo";

type Props = { data: any; letter: string };
const SubjectsPage: NextPage<Props> = props => (
  <>
    <NextSeo title={`Ämnen som börjar på '${props.letter}'`} />
    <h1>all subjects?? {props.letter}</h1>
    <pre>{JSON.stringify(props.data, null, "  ")}</pre>
  </>
);

SubjectsPage.getInitialProps = wrappedInitialProps<Props>(async ctx => {
  const letter = (ctx.query.letter as string).toLowerCase();
  const url = getSafeUrl(`/api/subjects/${letter}`, ctx.req);
  const data = await fetchAndParseJson("Subjects not found", url);
  return {
    data,
    letter
  };
});

export default SubjectsPage;
