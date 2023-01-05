import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { getAllCoursesData } from "../../../src/api/allCourses";
import { LettersList } from "../../../src/components/lettersList";
import { loadCourses } from "../../../src/api/load";
import { BulletList } from "../../../src/components/BulletList";
import Link from "next/link";

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
        formatHref={(s) => `/gy11/courses/${s.toLowerCase()}`}
      />
      <h1>Kurser som börjar på {props.letter}</h1>
      <div className="columns-md mb-8">
        {props.data.subjects.map((subj) => (
          <div key={subj.code} className="break-inside-avoid-column mb-2">
            <header className="text-gray-700 font-bold">{subj.title}</header>
            <BulletList>
              {subj.courses.map((cour) => (
                <Link
                  className="underline"
                  key={cour.code}
                  href={`/gy11/course/${cour.code}`}
                >
                  {cour.title} ({cour.points}p)
                </Link>
              ))}
            </BulletList>
          </div>
        ))}
      </div>
    </>
  );
};

export default CoursesPage;
