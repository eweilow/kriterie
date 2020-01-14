import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { LettersList } from "../../../components/lettersList";
import { getAllSubjectsData } from "../../../api/allSubjects";
import Link from "next/link";
import { loadSubjects } from "../../../api/load";
import { isNotFoundError } from "../../../api/helpers";
import KriterieError from "../../_error";

export async function unstable_getStaticProps({ params }) {
  try {
    return {
      props: {
        data: await getAllSubjectsData(params.letter.toLowerCase()),
        letter: params.letter
      },
      revalidate: false
    };
  } catch (err) {
    if (isNotFoundError(err)) {
      return {
        props: {
          data: null
        },
        revalidate: false
      };
    }
    throw err;
  }
}

export async function unstable_getStaticPaths() {
  const subjects = loadSubjects();

  const letters = Array.from(
    subjects.reduce<Set<string>>(
      (set, { title }) => set.add(title.toLowerCase()[0]),
      new Set<string>()
    )
  );
  letters.sort();

  return letters.map(letter => ({
    params: {
      letter
    }
  }));
}

type Props = { data: ReturnType<typeof getAllSubjectsData>; letter: string };
const SubjectsPage: NextPage<Props> = props => {
  if (props.data == null) {
    return (
      <KriterieError err={null} hasGetInitialPropsRun={true} statusCode={404} />
    );
  }

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
        formatAs={s => `/gy11/subjects/${s.toLowerCase()}`}
        formatHref={() => "/gy11/subjects/[letter]"}
      />
      <h1>Ämnen som börjar på {props.letter}</h1>
      <ul>
        {props.data.subjects.map(subj => (
          <li key={subj.code}>
            <Link href="/gy11/subject/[id]" as={`/gy11/subject/${subj.code}`}>
              <a>{subj.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          margin: 4px 0 12px 0;
          padding: 0 0 0 20px;
          columns: 3;
        }

        @media (max-width: 750px) {
          ul {
            columns: 2;
          }
        }

        @media (max-width: 500px) {
          ul {
            columns: 1;
          }
        }
        li {
          list-style: none;
          position: relative;
          line-height: 20px;
        }
        li + li {
          margin-top: 10px;
        }
        li::before {
          content: "";
          position: absolute;
          left: -10px;
          top: 10px;
          -khtml-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          width: 4px;
          height: 4px;
          background: #d44700;
        }
      `}</style>
    </>
  );
};

export default SubjectsPage;
