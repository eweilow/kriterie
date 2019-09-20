import { CookieUsage } from "@excitare/analytics";
import { CookieToggle } from "../components/cookieToggle";
import Head from "next/head";

const translations = {
  ganalytics: {
    type:
      "Permanent sparad kaka ifall användaren gett explicit tillstånd, annars sparad endast under ett webbplatsbesökstillfälle.",
    purpose:
      "Används för att lagra en långvarig ID som kan användas för att spåra beteende över flera webbplatsbesök. Ifall att långtidsspårning inte är godkänt av en användare så kommer denna ID förnyas efter varje besökstillfälle, vilket omöjliggör långtidsspårning."
  },
  ganalytics_id: {
    type: "Sparad under endast ett webbplatsbesökstillfälle.",
    purpose:
      "Används för att spåra interaktioner med webbplatsen under ett specifikt besökstillfälle. Sådana interaktioner är exempelvis vilka sidor som besöks och i vilken ordning."
  }
};
export default () => (
  <>
    <Head>
      <title>Kakanvändning på kriterie.se</title>
    </Head>
    <h1>Kakanvändning på kriterie.se</h1>
    {CookieUsage.filter(el => translations[el.name] != null).map(el => (
      <div key={el.name}>
        <h2>Kakans namn: {el.name}</h2>
        <h3>Syfte med kakan</h3>
        <p>{translations[el.name].purpose}</p>
        <h4>Kakans typ</h4>
        <p>{translations[el.name].type}</p>
      </div>
    ))}
    {CookieUsage.filter(el => translations[el.name] == null).map(el => (
      <div key={el.name}>
        <h2>Kakans namn: {el.name}</h2>
        <h3>Syfte med kakan (på engelska)</h3>
        <p>{el.purpose}</p>
        <h4>Kakans typ (på engelska)</h4>
        <p>{el.type}</p>
      </div>
    ))}
    <h2>Långtidsspårning</h2>
    <CookieToggle />
  </>
);
