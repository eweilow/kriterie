import Link from "next/link";
import { SearchBox } from "../components/searchBox";

export default () => (
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
    <Link href="/gy11/programmes">
      <a>alla program</a>
    </Link>
    <br />
    <Link href="/gy11/courses/[letter]" as="/gy11/courses/a">
      <a>alla kurser</a>
    </Link>
    <br />
    <Link href="/gy11/subjects/[letter]" as="/gy11/subjects/b">
      <a>alla ämnen</a>
    </Link>

    <h2>Dagens slumpmässiga urval</h2>
    <h3>Kurser</h3>
    <h3>Ämnen</h3>
    <h3>Program</h3>
    <h2>Dina favoriter</h2>
    <p>
      Du har ännu inte lagt till något som dina favoriter. Detta gör du genom
      att trycka på stjärnan på sidorna för kurser, ämnen och program!
    </p>
  </>
);
