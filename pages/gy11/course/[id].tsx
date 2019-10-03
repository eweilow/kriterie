import { useRouter } from "next/router";
import { NextPage } from "next";

import Link from "next/link";
import { getSafeUrl } from "../../../lib/safeUrl";
import { wrappedInitialProps, fetchAndParseJson } from "../../../lib/notFound";
import { NextSeo } from "next-seo";
import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import { Fragment } from "react";
import { jaroWinklerDistance } from "../../../components/searchBox/stringSearch/jaroWinkler";
import { levenshteinDistance } from "../../../components/searchBox/stringSearch/levenshtein";
import { diceCoefficient } from "../../../components/searchBox/stringSearch/diceCoefficient";
import { getCourseData } from "../../../api/course";
import { averageDistance } from "../../../components/searchBox/stringSearch/averageDistance";

const Bold: React.FC = ({ children }) => <b>{children}</b>;

const Line: React.FC = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
      div {
        display: block;
      }
      div::after {
        content: " ";
      }
    `}</style>
  </div>
);

const parseOptions: HTMLReactParserOptions = {
  replace({ name, attribs, children }) {
    if (!attribs) return;

    if (name === "strong") {
      return <Bold>{domToReact(children, parseOptions)}</Bold>;
    }
    return <Fragment>{domToReact(children, parseOptions)}</Fragment>;
  }
};

type Props = { data: ReturnType<typeof getCourseData> };
const CoursePage: NextPage<Props> = props => {
  const router = useRouter();

  return (
    <>
      <NextSeo title={props.data.title} />
      <Link
        href="/gy11/subject/[id]"
        as={`/gy11/subject/${props.data.subject.code}`}
      >
        <a>to subject {props.data.subject.title}</a>
      </Link>
      <h1>{props.data.title}</h1>

      <h2>Criteria</h2>
      {props.data.criteria.map((el, i) => (
        <div key={i}>
          <h3>E</h3>
          {el.E.map(el2 => (
            <Line key={el2}>{parse(el2, parseOptions)}</Line>
          ))}
          <h3>C</h3>
          {el.C.map(el2 => (
            <Line key={el2}>{parse(el2, parseOptions)}</Line>
          ))}
          <h3>A</h3>
          {el.A.map(el2 => (
            <Line key={el2}>{parse(el2, parseOptions)}</Line>
          ))}
        </div>
      ))}
      <h2>Kunskapskrav</h2>
      <CourseCriteria criteria={props.data.criteria} />

      <pre>{JSON.stringify(props.data, null, "  ")}</pre>
    </>
  );
};

CoursePage.getInitialProps = wrappedInitialProps<Props>(async ctx => {
  const id = (ctx.query.id as string).toLowerCase();
  const url = getSafeUrl(`/api/course/${id}`, ctx.req);
  const data = await fetchAndParseJson<any>(`Course '${id}' not found`, url);
  return {
    data
  };
});

export default CoursePage;
