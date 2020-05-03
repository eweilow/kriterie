import { NextPage, PageConfig } from "next";

import Link from "next/link";
import { NextSeo } from "next-seo";
import { ApplicableProgrammesList } from "../../../components/programmes";
import { getSubjectData } from "../../../api/subject";
import { SimpleControls } from "../../../components/purposeControls";
import { useState, useMemo } from "react";
import clsx from "clsx";
import { FavoritesButton } from "../../../components/favorites/button";
import KriterieError from "../../_error";
import { isNotFoundError } from "../../../api/helpers";
import { loadSubjects } from "../../../api/load";
import { useAmp } from "next/amp";

export async function getStaticProps({ params }) {
  try {
    return {
      props: {
        data: await getSubjectData(params.id.toLowerCase())
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

export async function getStaticPaths() {
  const courses = loadSubjects();

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

type Props = { data: ReturnType<typeof getSubjectData> };
const SubjectPage: NextPage<Props> = props => {
  const [showAllCourseInfo, setShowAllCourseInfo] = useState(false);

  const description = useMemo(() => {
    if (props.data == null) {
      return null;
    }
    return `${props.data.description}`;
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
        canonical={`https://kriterie.se/gy11/subject/${props.data.code}`}
        title={props.data.title}
      />
      <ApplicableProgrammesList programmes={props.data.applicableProgrammes} />
      <h1>{props.data.title}</h1>
      {!isAmp && (
        <FavoritesButton
          storageKey="kriterie:favorites:subject"
          code={props.data.code}
        />
      )}
      <p>{props.data.description}</p>
      <h2>Kurser inom ämnet</h2>
      {!isAmp && (
        <SimpleControls
          value={showAllCourseInfo}
          setValue={setShowAllCourseInfo}
          label="visa detaljerad kursinformation"
          name="info"
        />
      )}
      <ul className={clsx({ wrap: !showAllCourseInfo })}>
        {props.data.courses.map(el => (
          <li key={el.code}>
            <Link href="/gy11/course/[id]" as={`/gy11/course/${el.code}`}>
              <a>
                {showAllCourseInfo && props.data.courseInfo[el.code]}
                {!showAllCourseInfo && (
                  <>
                    {el.title} ({el.points}p)
                  </>
                )}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <h2>Ämnets syfte</h2>
      {props.data.purposes.map(el => (
        <p key={el}>{el}</p>
      ))}
      <h2>Elevens utvecklingsmöjligheter inom ämnet</h2>
      <p>
        Genom undervisning inom ämnet {props.data.title.toLowerCase()} bör en
        elev få möjlighet att utveckla följande:
      </p>
      <ul>
        {props.data.developmentPurposes.map(el => (
          <li key={el}>{el}</li>
        ))}
      </ul>
      <style jsx>{`
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

        ul.wrap {
          columns: 3;
        }

        @media (max-width: 750px) {
          ul.wrap {
            columns: 2;
          }
        }

        @media (max-width: 500px) {
          ul.wrap {
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

export default SubjectPage;

/*
// AMP doesn't seem to work with getStaticProps at the moment
export const config: PageConfig = {
  amp: "hybrid"
};
*/
