import courses from "@education-data/swedish-gymnasium/out/courses.json";
import subjects from "@education-data/swedish-gymnasium/out/subjects.json";
import programs from "@education-data/swedish-gymnasium/out/programmes.json";

import { fetchTime } from "@education-data/swedish-gymnasium/out/meta.json";
import { NextApiRequest, NextApiResponse } from "next";
import { catchError } from "../../api/helpers";

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const xml: string[] = [];

    const pushPage = (
      url: string,
      priority: number,
      lastModified: Date = new Date()
    ) => {
      xml.push(
        `  <url>`,
        `    <loc>${url}</loc>`,
        `    <lastmod>${lastModified.toISOString()}</lastmod>`,
        `    <priority>${priority.toFixed(2)}</priority>`,
        `    <changefreq>daily</changefreq>`,
        `  </url>`
      );
    };

    pushPage(`https://kriterie.se/`, 0.9);

    const fetchDate = new Date(fetchTime);

    for (const course of courses) {
      pushPage(
        `https://kriterie.se/gy11/course/${course.code}`,
        0.6,
        fetchDate
      );
    }

    for (const subject of subjects) {
      pushPage(
        `https://kriterie.se/gy11/subject/${subject.code}`,
        0.6,
        fetchDate
      );
    }

    for (const program of programs) {
      pushPage(
        `https://kriterie.se/gy11/program/${program.code}`,
        0.6,
        fetchDate
      );
    }

    xml.unshift(
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`
    );

    xml.push("</urlset>");

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml.join("\n"));
  } catch (err) {
    catchError(err, req, res);
  }
};
