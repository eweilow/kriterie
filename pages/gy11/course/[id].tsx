import { NextPage, PageConfig } from "next";

import Link from "next/link";
import { NextSeo } from "next-seo";
import { Fragment, useState, useMemo } from "react";
import { CourseCriteria } from "../../../components/criteria";
import { getCourseData } from "../../../api/course";
import { SimpleControls } from "../../../components/purposeControls";
import clsx from "clsx";
import { ApplicableProgrammesList } from "../../../components/programmes";
import { FavoritesButton } from "../../../components/favorites/button";
import { isNotFoundError } from "../../../api/helpers";
import { loadCourses } from "../../../api/load";
import KriterieError from "../../_error";
import { useAmp } from "next/amp";

export async function getStaticProps({ params }) {
  try {
    return {
      props: {
        data: await getCourseData(params.id.toLowerCase())
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

  return {
    paths: [
      ...courses.map(el => ({
        params: {
          id: el.code
        }
      }))
    ],
    fallback: false
  };
}

type Props = { data: ReturnType<typeof getCourseData> };
const CoursePage: NextPage<Props> = props => {
  const [showAllPurposes, setShowAllPurposes] = useState(false);

  const description = useMemo(() => {
    if (props.data == null) {
      return null;
    }

    const content =
      "\n - " +
      props.data.centralContent.map(el => el[1].join("\n - ")).join("\n");
    return `Gymnasiekursen ${props.data.title.toLowerCase()} (${
      props.data.points
    }p) är en kurs inom ämnet ${props.data.subject.title.toLowerCase()} (${
      props.data.subject.code
    }). Kursens innehåll är: ${content}`;
  }, [props.data]);

  if (props.data == null) {
    return (
      <KriterieError err={null} hasGetInitialPropsRun={true} statusCode={404} />
    );
  }

  const isAmp = useAmp();

  return (
    <>
      <NextSeo
        openGraph={{ description }}
        description={description}
        canonical={`https://kriterie.se/gy11/course/${props.data.code}`}
        title={props.data.title}
      />
      <ApplicableProgrammesList programmes={props.data.applicableProgrammes} />
      <h1>{props.data.title}</h1>
      <section className="summary">
        <div>
          <div>kurs</div>
        </div>
        <div>
          <header>Ämne</header>
          <div>
            <Link
              href="/gy11/subject/[id]"
              as={`/gy11/subject/${props.data.subject.code}`}
            >
              <a>{props.data.subject.title}</a>
            </Link>
          </div>
        </div>
        <div>
          <header>Kurskod</header>
          <div>{props.data.code}</div>
        </div>
        <div>
          <header>Poäng</header>
          <div>{props.data.points}p</div>
        </div>
      </section>
      {!isAmp && (
        <FavoritesButton
          storageKey="kriterie:favorites:course"
          code={props.data.code}
        />
      )}
      <h2>Kursens omfattning av ämnets syfte</h2>
      {!isAmp && (
        <SimpleControls
          disabled={!props.data.subjectPurposes.find(el => !el.applicable)}
          value={showAllPurposes}
          setValue={setShowAllPurposes}
          label="visa hela ämnets omfattning"
          name="dense"
        />
      )}
      <p>
        Den omfattning som listas här är en insikt i hur kursen{" "}
        {props.data.title.toLowerCase()} relaterar till syftet med ämnet{" "}
        {props.data.subject.title.toLowerCase()}, samt vilka förmågor en elev
        som läser kursen bör utveckla under dess gång.
      </p>
      <ul>
        {props.data.subjectPurposes
          .filter(el => showAllPurposes || el.applicable)
          .map(el => (
            <li
              key={el.value}
              className={clsx({ nonApplicable: !el.applicable })}
            >
              {!el.applicable && <b>ej del av kursen: </b>}
              {el.value}
            </li>
          ))}
      </ul>
      <h2>Centralt innehåll</h2>
      <p>
        Detta är det innehåll som bör läras ut inom ramarna för kursen{" "}
        {props.data.title.toLowerCase()}.
      </p>
      {props.data.centralContent.map(el => (
        <Fragment key={el[0]}>
          {el[0] && <h4>{el[0]}</h4>}
          <ul>
            {el[1].map(el => (
              <li key={el}>{el}</li>
            ))}
          </ul>
        </Fragment>
      ))}
      <h2>Kunskapskrav</h2>
      <p>
        Dessa är kraven för olika betyg i kursen{" "}
        {props.data.title.toLowerCase()}.
      </p>
      <CourseCriteria criteria={props.data.criteria} />
      <style jsx>{`
        .summary {
          display: flex;
          flex-wrap: wrap;
        }

        .summary > div > header {
          color: #777;
        }

        .summary > div {
          display: flex;
          justify-content: center;
        }

        .summary > div header::after {
          content: ":";
          padding-right: 0.5em;
        }
        .summary > div + div::before {
          content: "|";
          padding: 0 1em;
        }
        .summary > div > div {
          font-weight: bold;
        }

        @media (max-width: 600px) {
          .summary > div {
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 50%;
            box-sizing: border-box;
            padding: 4px 8px;
          }
          .summary {
            margin: -4px -8px;
          }
          .summary > div + div::before {
            display: none;
          }
        }

        h2 {
          border-bottom: 4px solid #d44700;
          padding-bottom: 8px;
          margin-left: -8px;
          margin-right: -8px;
          padding-left: 8px;
          padding-right: 8px;
        }

        ul {
          margin: 16px 0;
          padding: 0 0 0 20px;
        }

        li {
          list-style: none;
          position: relative;
          line-height: 20px;
        }

        li + li {
          margin-top: 10px;
        }

        li.nonApplicable {
          color: #666;
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

export default CoursePage;

/*
// AMP doesn't seem to work with getStaticProps at the moment
export const config: PageConfig = {
  amp: "hybrid"
};
*/
