import Link from "next/link";
import { SearchBox } from "../src/components/searchBox";
import { NextPage } from "next";
import { Suspense } from "react";
import { NextSeo } from "next-seo";

import dynamic from "next/dynamic";

const FavoritesList = dynamic(
  () => import("../src/components/favorites/list").then((m) => m.FavoritesList),
  { ssr: false }
);

import { loadCourses, loadSubjects } from "../src/api/load";
import { startOfDay } from "date-fns";
import seedrandom from "seedrandom";
import { ErrorBoundary } from "@sentry/nextjs";

export async function getStaticProps() {
  const courses = loadCourses();
  const subjects = loadSubjects();

  const now = new Date();
  const seed = (+startOfDay(now) + 1).toString();

  const rnd = seedrandom(seed);

  const courseSelection = new Set<any>();
  while (courseSelection.size < 3) {
    courseSelection.add(courses[Math.floor(courses.length * rnd())]);
  }

  const subjectSelection = new Set<any>();
  while (subjectSelection.size < 3) {
    subjectSelection.add(subjects[Math.floor(subjects.length * rnd())]);
  }

  return {
    props: {
      data: {
        courses: [...courseSelection].map((el) => ({
          code: el.code,
          title: el.title,
        })),
        subjects: [...subjectSelection].map((el) => ({
          code: el.code,
          title: el.title,
        })),
      },
    },
    revalidate: 60 * 60 * 24,
  };
}

type Props = { data: any };
const Page: NextPage<Props> = (props) => (
  <>
    <NextSeo canonical="https://kriterie.se" />
    <h1>Välkommen till kriterie.se!</h1>
    <p>
      Kriterie.se är en webbsida där Skolverkets data om gymnasiets kurser och
      ämnen presenteras i ett lättåtkomligt format. Vad vill du veta mer om
      idag?
    </p>
    <div className="md:h-14 h-12">
      <SearchBox id="homeSearchBox" />
    </div>
    <p>eller:</p>
    <Link href="/gy11/courses/a">alla kurser</Link>
    <br />
    <Link href="/gy11/subjects/a">alla ämnen</Link>

    <h2>Dagens slumpmässiga urval</h2>
    <h3>Kurser</h3>
    {props.data.courses.map((el) => (
      <div key={el.code}>
        <Link href={`/gy11/course/${el.code}`}>{el.title}</Link>
      </div>
    ))}
    <h3>Ämnen</h3>
    {props.data.subjects.map((el) => (
      <div key={el.code}>
        <Link href={`/gy11/subject/${el.code}`}>{el.title}</Link>
      </div>
    ))}

    <ErrorBoundary fallback={<div className="h-52" />}>
      <Suspense fallback={<div className="h-52" />}>
        <FavoritesList />
      </Suspense>
    </ErrorBoundary>
  </>
);

export default Page;
