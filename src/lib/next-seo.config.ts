import { DefaultSeoProps } from "next-seo";

export const defaultSeoConfiguration = {
  title: "Hem",
  titleTemplate: "%s | kriterie.se",
  // description: "Kriterie.se är en webbsida där Skolverkets data om gymnasiets kurser, ämnen och program presenteras i ett lättåtkomligt format.",
  description:
    "Kriterie.se är en webbsida där Skolverkets data om gymnasiets kurser och ämnen presenteras i ett lättåtkomligt format.",
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://kriterie.se",
    site_name: "kriterie.se",
  },
} as DefaultSeoProps;
