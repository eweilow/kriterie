import Link from "next/link";
import { SearchBox } from "../components/searchBox";
import { NextPage } from "next";
import { fetchAndParseJson, wrappedInitialProps } from "../lib/notFound";
import { getSafeUrl } from "../lib/safeUrl";

type Props = { data: any };
const Page: NextPage<Props> = props => (
  <>
    <h1>Välkommen till kriterie.se!</h1>
    <p>
      Kriterie.se är en webbsida där Skolverkets data om gymnasiets kurser,
      ämnen och program presenteras i ett lättåtkomligt format. Vad vill du veta
      mer om idag?
    </p>
    <div>
      <SearchBox id="homeSearchBox" />
      <style jsx>{`
        div {
          height: 56px;
          width: 100%;
        }
        @media (max-width: 800px) {
          div {
            height: 48px;
          }
        }
      `}</style>
    </div>
    <p>eller:</p>
    <Link href="/gy11/courses/[letter]" as="/gy11/courses/a">
      <a>alla kurser</a>
    </Link>
    <br />
    <Link href="/gy11/subjects/[letter]" as="/gy11/subjects/b">
      <a>alla ämnen</a>
    </Link>
    <br />
    <Link href="/gy11/programmes">
      <a>alla program</a>
    </Link>

    <h2>Dagens slumpmässiga urval</h2>
    <h3>Kurser</h3>
    {props.data.courses.map(el => (
      <div key={el.code}>
        <Link href="/gy11/course/[id]" as={`/gy11/course/${el.code}`}>
          <a>{el.title}</a>
        </Link>
      </div>
    ))}
    <h3>Ämnen</h3>
    {props.data.subjects.map(el => (
      <div key={el.code}>
        <Link href="/gy11/subject/[id]" as={`/gy11/subject/${el.code}`}>
          <a>{el.title}</a>
        </Link>
      </div>
    ))}
    <h3>Program</h3>
    {props.data.programmes.map(el => (
      <div key={el.code}>
        <Link href="/gy11/program/[id]" as={`/gy11/program/${el.code}`}>
          <a>{el.title}</a>
        </Link>
      </div>
    ))}
    <h2>Dina favoriter</h2>
    <p>
      Du har ännu inte lagt till något som dina favoriter. Detta gör du genom
      att trycka på stjärnan på sidorna för kurser, ämnen och program!
    </p>
  </>
);

Page.getInitialProps = wrappedInitialProps<Props>(async ctx => {
  const url = getSafeUrl(`/api/home`, ctx.req);
  const data = await fetchAndParseJson(`Home data was not found`, url);
  return {
    data
  };
});

export default Page;
