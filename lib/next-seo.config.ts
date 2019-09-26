import { DefaultSeoProps } from "next-seo";

export const defaultSeoConfiguration = {
  title: "Hem",
  titleTemplate: "%s | kriterie.se",
  description:
    "Kriterie.se är en webbsida där Skolverkets data om gymnasiets kurser, ämnen och program presenteras i ett lättåtkomligt format.",
  canonical: "https://kriterie.se",
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://kriterie.se",
    site_name: "kriterie.se"
  }
} as DefaultSeoProps;
