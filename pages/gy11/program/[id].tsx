import { NextPage } from "next";

import { getSafeUrl } from "../../../lib/safeUrl";
import { wrappedInitialProps, fetchAndParseJson } from "../../../lib/notFound";
import { NextSeo } from "next-seo";
import { getProgramData } from "../../../api/program";
import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import { CourseList } from "../../../components/courseList";

const parseOptions: HTMLReactParserOptions = {
  replace({ name, attribs, children }) {
    if (!attribs) return;

    if (name === "p") {
      return <p>{domToReact(children, parseOptions)}</p>;
    }
    return <>{domToReact(children, parseOptions)}</>;
  }
};

type Props = { data: ReturnType<typeof getProgramData> };
const ProgramPage: NextPage<Props> = props => {
  return (
    <>
      <NextSeo title={props.data.title} />
      <h1>{props.data.title}</h1>
      <section className="summary">
        <div>
          <div>{props.data.type}</div>
        </div>
        <div>
          <header>Programkod</header>
          <div>{props.data.code}</div>
        </div>
      </section>

      <h2>Mål med examen inom programmet</h2>
      <>{parse(props.data.info.degreeObjective.html, parseOptions)}</>

      <h2>{props.data.info.educationObjective.title}</h2>
      <>{parse(props.data.info.educationObjective.html, parseOptions)}</>

      <h2>Programmets struktur</h2>
      <h3>Gymnasiegemensamma ämnen</h3>
      <p>
        Dessa ämnen och kurser är de som typiskt sett är samma på de olika{" "}
        {props.data.type.toLowerCase()}men.
      </p>
      <CourseList subjects={props.data.education.mandatory} />
      <p>
        Typiskt sett läses kurser antingen inom ämnet <b>svenska</b>{" "}
        <i>eller</i> <b>svenska som andraspråk</b>.
      </p>
      <h3>Programgemensamma ämnen</h3>
      <p>
        Dessa ämnen och kurser är de som typiskt sett är gemensamma på{" "}
        {props.data.title.toLowerCase()}, oberoende av vilken skola programmet
        läses på.
      </p>
      <CourseList subjects={props.data.education.program} />
      <h3>Inriktningar</h3>
      <>{parse(props.data.info.orientation.html, parseOptions)}</>
      {props.data.education.orientations.map(orie => (
        <>
          <h4>
            {orie.name} ({orie.code}, {orie.points}p)
          </h4>
          {orie.code === "NANAS" && (
            <p>
              Utöver följande ämnen läses också 100 poäng inom ett valfritt
              naturvetenskapligt ämne.
            </p>
          )}
          <CourseList subjects={orie.subjects} />
        </>
      ))}
      {props.data.education.profiles.length > 0 && (
        <>
          <h3>Profiler</h3>
          {props.data.education.profiles.map(orie => (
            <>
              <h4>
                {orie.name} ({orie.code}, {orie.points}p)
              </h4>
              <CourseList subjects={orie.subjects} />
            </>
          ))}
        </>
      )}
      {props.data.education.professionalDegrees.length > 0 && (
        <>
          <h3>Yrkesutgångar</h3>
          {props.data.education.professionalDegrees.map(orie => (
            <>
              <h4>
                {orie.name} ({orie.code})
              </h4>
              <CourseList subjects={orie.subjects} />
            </>
          ))}
        </>
      )}
      <h2>Programfördjupningskurser</h2>
      <p>
        Dessa kurser är typiskt sett de som får erbjudas som programfördjupning
        inom {props.data.title.toLowerCase()}.
      </p>
      <CourseList subjects={props.data.education.specialization} />
      <style jsx>{`
        h2 {
          border-bottom: 4px solid #d44700;
          padding-bottom: 8px;
          margin-left: -8px;
          margin-right: -8px;
          padding-left: 8px;
          padding-right: 8px;
        }

        .summary {
          display: flex;
          flex-wrap: wrap;
        }

        .summary > div {
          display: flex;
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
          }
          .summary > div + div::before {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

ProgramPage.getInitialProps = wrappedInitialProps<Props>(async ctx => {
  const id = (ctx.query.id as string).toLowerCase();
  const url = getSafeUrl(`/api/program/${id}`, ctx.req);
  const data = await fetchAndParseJson<any>(`Program '${id}' not found`, url);
  return {
    data
  };
});

export default ProgramPage;
