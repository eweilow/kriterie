import { NextPage } from "next";
import { wrappedInitialProps, fetchAndParseJson } from "../../../lib/notFound";
import { getSafeUrl } from "../../../lib/safeUrl";
import { NextSeo } from "next-seo";

type Props = { data: any; letter: string };
const CoursesPage: NextPage<Props> = props => (
  <>
    <NextSeo title={`Kurser som börjar på '${props.letter}'`} />
    <h1>all courses?? {props.letter}</h1>
    <pre>{JSON.stringify(props.data, null, "  ")}</pre>
  </>
);

CoursesPage.getInitialProps = wrappedInitialProps<Props>(async ctx => {
  const letter = (ctx.query.letter as string).toLowerCase();
  const url = getSafeUrl(`/api/courses/${letter}`, ctx.req);
  const data = await fetchAndParseJson("Courses not found", url);
  return {
    data,
    letter
  };
});

export default CoursesPage;
