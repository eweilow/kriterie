import { NextSeo } from "next-seo";
import Link from "next/link";

export default function Gr11Page() {
  return (
    <>
      <NextSeo
        noindex={true}
        canonical="https://kriterie.se/gr11"
        title="Grundskolan"
      />
      <h1>Grundskolan på kriterie.se</h1>
      <p>
        Om du har hamnat på denna sida betyder det att du kanske klickat på en
        sparad länk som leder till de gamla grundskolesidorna på kriterie.se. Du
        kanske också kommit hit via en sökmotor.
      </p>
      <p>
        Tyvärr har det blivit nödvändigt att inte längre underhålla information
        om grundskolans ämnen på kriterie.se, då en majoritet av sidbesök är
        till information för gymnasiet. Detta då det krävs finess att tolka
        Skolverkets öppna data till det formatet och den standard som det
        presenteras med här.
      </p>
      <p>
        Om det är så att du haft nytta av grundskoleinformation på kriterie.se
        och önskar att åter igen hitta den här kan du dela med dig av ditt
        intresse i nedanstående formulär:
      </p>
      <Link href="https://docs.google.com/forms/d/e/1FAIpQLScqlbajJ2iTmAAtXRrGCOX1feQg17Cj25QJpyb8SjkgE4lYQA/viewform">
        <a rel="noreferrer noopener" target="_blank">
          Extern länk (Google Forms)
        </a>
      </Link>
    </>
  );
}
