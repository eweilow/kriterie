import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { LettersList } from "../../../src/components/lettersList";
import { getAllSubjectsData } from "../../../src/api/allSubjects";
import Link from "next/link";
import { loadSubjects } from "../../../src/api/load";
import { BulletList } from "../../../src/components/BulletList";

export async function getStaticProps({ params }) {
  return {
    props: {
      data: getAllSubjectsData(params.letter.toLowerCase()),
      letter: params.letter,
    },
    revalidate: false,
  };
}

export async function getStaticPaths() {
  const subjects = loadSubjects();

  const letters = Array.from(
    subjects.reduce<Set<string>>(
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

type Props = { data: ReturnType<typeof getAllSubjectsData>; letter: string };
const SubjectsPage: NextPage<Props> = (props) => {
  return (
    <>
      <NextSeo
        noindex={true}
        canonical={`https://kriterie.se/gy11/subjects/${props.letter.toLowerCase()}`}
        title={`Ämnen som börjar på '${props.letter}'`}
      />
      <LettersList
        letters={props.data.letters}
        activeLetter={props.letter}
        formatHref={(s) => `/gy11/subjects/${s.toLowerCase()}`}
      />
      <h1>Ämnen som börjar på {props.letter}</h1>
      <BulletList className="columns-2xs">
        {props.data.subjects.map((subj) => (
          <Link
            key={subj.code}
            href={`/gy11/subject/${subj.code}`}
            className="link"
          >
            {subj.title}
          </Link>
        ))}
      </BulletList>
    </>
  );
};

export default SubjectsPage;
