import { useRouter } from "next/router";
import { NextPage } from "next";

import Link from "next/link";
import { getSafeUrl } from "../../../lib/safeUrl";
import { wrappedInitialProps, fetchAndParseJson } from "../../../lib/notFound";
import { NextSeo } from "next-seo";
import { Fragment } from "react";
import { CourseCriteria } from "../../../components/criteria";
import { getCourseData } from "../../../api/course";

type Props = { data: ReturnType<typeof getCourseData> };
const CoursePage: NextPage<Props> = props => {
  const router = useRouter();

  // Convert this to local storage based later?

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
      <h2>Kursens omfattning av ämnets syfte</h2>
      <p>Dessa är [...]</p>
      {props.data.subjectPurposes.map(el => (
        <p key={el}>{el}</p>
      ))}

      <h2>Centralt innehåll</h2>
      <p>Dessa är [...]</p>
      {props.data.centralContent.map(el => (
        <Fragment key={el[0]}>
          {el[0] && <header>{el[0]}</header>}
          <ul>
            {el[1].map(el => (
              <li key={el}>{el}</li>
            ))}
          </ul>
        </Fragment>
      ))}

      <h2>Kunskapskrav</h2>
      <CourseCriteria criteria={props.data.criteria} />

      <pre>{JSON.stringify(props.data, null, "  ")}</pre>

      <style jsx>{`
        h2 {
          border-bottom: 4px solid #d44700;
          padding-bottom: 8px;
          margin-left: -8px;
          margin-right: -8px;
          padding-left: 8px;
          padding-right: 8px;
        }
      `}</style>
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
