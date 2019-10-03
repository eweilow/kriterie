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

const lev = (a: string, b: string) =>
  1 - levenshteinDistance(a, b) / (0.5 * (a.length + b.length));

const tripleAverage = (a: string, b: string) => {
  const levensthein = lev(a, b);
  const jaro = jaroWinklerDistance(a, b);
  const dice = diceCoefficient(a, b);
  return Math.hypot(jaro, dice, levensthein);
};

function computeProbability(x: number, mu: number, sigma: number) {
  const dt = 0.1;
  let sum = 0;
  for (let i = 0; i < 1000; i++) {
    const increment =
      ((dt * 1) / Math.sqrt(2 * Math.PI * sigma * sigma)) *
      Math.exp(-Math.pow(x - mu, 2) / (2 * sigma * sigma));
    sum += increment;
    x += dt;
    if (increment < 1e-3) {
      break;
    }
  }
  return sum;
}

const CriteriaTable: React.FC<{
  from: string[][];
  to: string[][];
  distanceFn: (a: string, b: string) => number;
}> = ({ from, to, distanceFn }) => {
  return (
    <table>
      <tr>
        <td />
        {to.map((el2, i2) => {
          return <td key={i2}>{i2}</td>;
        })}
      </tr>
      {from.map((el, i) => {
        const combined = el.join(" ");

        const scores = to.map(el2 => {
          const combined2 = el2.join(" ");
          return {
            key: combined2,
            value: distanceFn(combined, combined2)
          };
        });

        const maxScore = Math.max(...scores.map(el => el.value));

        const mean =
          scores.reduce((prev, curr) => prev + curr.value, 0) / scores.length;
        const variance =
          scores.reduce(
            (prev, curr) => prev + Math.pow(curr.value - mean, 2),
            0
          ) / scores.length;
        const stDev = Math.sqrt(variance);

        return (
          <tr key={combined}>
            <td>{i}</td>
            {scores.map(({ key, value }) => {
              return (
                <td className={value === maxScore ? "max" : ""} key={key}>
                  {(value * 100).toFixed(0)}%
                </td>
              );
            })}
            <td>{(mean * 100).toFixed(0)}%</td>
            <td>{(variance * 100).toFixed(0)}%</td>
            <td>{(stDev * 100).toFixed(0)}%</td>
            <td>
              {((1 - computeProbability(maxScore, mean, stDev)) * 100).toFixed(
                1
              )}
              %
            </td>
            <td>
              {(
                maxScore *
                (1 - computeProbability(maxScore, mean, stDev)) *
                100
              ).toFixed(1)}
              %
            </td>
          </tr>
        );
      })}
      <style jsx>{`
        table {
          border-collapse: collapse;
        }
        td {
          border: 1px solid gray;
          padding: 4px;
        }
        td.max {
          font-weight: bold;
        }
      `}</style>
    </table>
  );
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
      <h1>course?? {router.query.id}</h1>

      <h2>E->C</h2>
      <CriteriaTable
        from={props.data.criteria.E}
        to={props.data.criteria.C}
        distanceFn={diceCoefficient}
      />
      <h2>E->A</h2>
      <CriteriaTable
        from={props.data.criteria.E}
        to={props.data.criteria.A}
        distanceFn={diceCoefficient}
      />

      <h2>C->E</h2>
      <CriteriaTable
        from={props.data.criteria.C}
        to={props.data.criteria.E}
        distanceFn={diceCoefficient}
      />
      <h2>C->A</h2>
      <CriteriaTable
        from={props.data.criteria.C}
        to={props.data.criteria.A}
        distanceFn={diceCoefficient}
      />

      <h2>A->E</h2>
      <CriteriaTable
        from={props.data.criteria.A}
        to={props.data.criteria.E}
        distanceFn={diceCoefficient}
      />
      <h2>A->C</h2>
      <CriteriaTable
        from={props.data.criteria.A}
        to={props.data.criteria.C}
        distanceFn={diceCoefficient}
      />

      <h2>E</h2>
      {props.data.criteria.E.map((el, i) => (
        <div key={i}>
          {el.map(el2 => (
            <Line key={el2}>{parse(el2, parseOptions)}</Line>
          ))}
        </div>
      ))}
      <h2>C</h2>
      {props.data.criteria.C.map((el, i) => (
        <div key={i}>
          {el.map(el2 => (
            <Line key={el2}>{parse(el2, parseOptions)}</Line>
          ))}
        </div>
      ))}
      <h2>A</h2>

      {props.data.criteria.A.map((el, i) => (
        <div key={i}>
          {el.map(el2 => (
            <Line key={el2}>{parse(el2, parseOptions)}</Line>
          ))}
        </div>
      ))}

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
