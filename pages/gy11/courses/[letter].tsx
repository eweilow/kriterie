import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { getAllCoursesData } from "../../../api/allCourses";
import { CourseList } from "../../../components/courseList";
import { LettersList } from "../../../components/lettersList";
import { isNotFoundError } from "../../../api/helpers";
import { loadCourses } from "../../../api/load";
import KriterieError from "../../_error";

export async function getStaticProps({ params }) {
  try {
    return {
      props: {
        data: await getAllCoursesData(params.letter.toLowerCase()),
        letter: params.letter
      },
      unstable_revalidate: false
    };
  } catch (err) {
    if (isNotFoundError(err)) {
      return {
        props: {
          data: null
        },
        unstable_revalidate: false
      };
    }
    throw err;
  }
}

export async function getStaticPaths() {
  const courses = loadCourses();

  const letters = Array.from(
    courses.reduce<Set<string>>(
      (set, { title }) => set.add(title.toLowerCase()[0]),
      new Set<string>()
    )
  );
  letters.sort();

  return {
    paths: [
      ...letters.map(letter => ({
        params: {
          letter
        }
      }))
    ],
    fallback: false
  };
}

type Props = { data: ReturnType<typeof getAllCoursesData>; letter: string };
const CoursesPage: NextPage<Props> = props => {
  if (props.data == null) {
    return (
      <KriterieError err={null} hasGetInitialPropsRun={true} statusCode={404} />
    );
  }

  return (
    <>
      <NextSeo
        noindex={true}
        canonical={`https://kriterie.se/gy11/courses/${props.letter.toLowerCase()}`}
        title={`Kurser som börjar på '${props.letter}'`}
      />
      <LettersList
        letters={props.data.letters}
        activeLetter={props.letter}
        formatAs={s => `/gy11/courses/${s.toLowerCase()}`}
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
};

export default CoursesPage;
