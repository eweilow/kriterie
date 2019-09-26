import { NextSeo } from "next-seo";

export default function InfoPage() {
  return (
    <>
      <NextSeo noindex={true} title="Information" />
      <h1>Info</h1>

      <h2>Kort historik</h2>
      <p>
        kriterie.se började ursprungligen som ett simpelt program för att hämta
        data om gymnasiets kurser från Skolverkets hemsida. Med tanke på hur
        ostrukturerad datan var presenterad på Skolverkets hemsida skapades
        kriterie.se som ett lättillgängligt alternativ. Här finns både den
        relevanta informationen om gymnasiets kurser, ämnen och program, men
        även också funktionalitet som underlättar studietiden både för elever
        och lärare.
      </p>
      <h2>Informationens korrekthet</h2>
      <p>
        Det är viktigt att den informationen som finns på kriterie.se är
        uppdaterad och korrekt. Den råa datan från Skolverket kräver en del
        bearbetning för att kunna visas på det sättet den görs på kriterie.se,
        vilket alltid innebär en risk för att något går fel. Detta är speciellt
        ett faktum när det finns ett tusental kurser och ett hundratal ämnen.
        Det är helt enkelt inte praktiskt möjligt att bekräfta att allt är
        hundraprocentigt korrekt. Om något mot allt förmodan skulle vara fel så
        tveka inte att{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={
            "https://github.com/eweilow/swedish-education-data/issues/new?title=" +
            encodeURIComponent("[kriterie.se] Something is wrong!")
          }
        >
          lämna en issue på Github
        </a>{" "}
        eller{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://m.me/kriterie"
        >
          kontakta kriterie.se på Facebook
        </a>
        .
      </p>
    </>
  );
}
