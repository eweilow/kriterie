import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { getAllCoursesData } from "../../../src/api/allCourses";
import { CourseList } from "../../../src/components/courseList";
import { LettersList } from "../../../src/components/lettersList";
import { loadCourses } from "../../../src/api/load";

export async function getStaticProps({ params }) {
  return {
    props: {
      data: getAllCoursesData(params.letter.toLowerCase()),
      letter: params.letter,
    },
    revalidate: false,
  };
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
      ...letters.map((letter) => ({
        params: {
          letter,
        },
      })),
    ],
    fallback: false,
  };
}

type Props = { data: ReturnType<typeof getAllCoursesData>; letter: string };
const CoursesPage: NextPage<Props> = (props) => {
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
        formatAs={(s) => `/gy11/courses/${s.toLowerCase()}`}
        formatHref={() => "/gy11/courses/[letter]"}
      />
      <h1>Kurser som börjar på {props.letter}</h1>
      <CourseList
        subjects={props.data.subjects.map((el) => ({
          ...el,
          minPoints: null,
          freeChoice: 0,
        }))}
      />
    </>
  );
};

export default CoursesPage;
