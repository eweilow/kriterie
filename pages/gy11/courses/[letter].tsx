import { NextPage } from "next";
import { wrappedInitialProps, fetchAndParseJson } from "../../../lib/notFound";
import { getSafeUrl } from "../../../lib/safeUrl";
import { NextSeo } from "next-seo";
import { getAllCoursesData } from "../../../api/allCourses";
import { CourseList } from "../../../components/courseList";
import { LettersList } from "../../../components/lettersList";

type Props = { data: ReturnType<typeof getAllCoursesData>; letter: string };
const CoursesPage: NextPage<Props> = props => (
  <>
    <NextSeo noindex={true} title={`Kurser som börjar på '${props.letter}'`} />
    <LettersList
      letters={props.data.letters}
      activeLetter={props.letter}
      formatAs={s => `/gy11/courses/${s}`}
      formatHref={() => "/gy11/courses/[letter]"}
    />
    <h1>Kurser som börjar på {props.letter}</h1>
    <CourseList
      subjects={props.data.subjects.map(el => ({
        ...el,
        minPoints: null,
        freeChoice: 0
      }))}
    />
  </>
);

CoursesPage.getInitialProps = wrappedInitialProps<Props>(async ctx => {
  const letter = (ctx.query.letter as string).toLowerCase();
  const url = getSafeUrl(`/api/courses/${encodeURIComponent(letter)}`, ctx.req);
  const data = await fetchAndParseJson<any>("Courses not found", url);
  return {
    data,
    letter
  };
});

export default CoursesPage;
