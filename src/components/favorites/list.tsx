import { useFavorite } from "../../lib/useFavorite";
import { useFetch } from "../../lib/useFetch";
import { useMemo } from "react";
import type { SearchData } from "../../api/search";
import Link from "next/link";
import { SearchPreload } from "../searchBox/searchPreload";

function useFavorites(key: string): string[] {
  const [, , , state] = useFavorite(key, "");

  return state as string[];
}
export const FavoritesList = () => {
  const courseFavorites = useFavorites("kriterie:favorites:course");
  const subjectFavorites = useFavorites("kriterie:favorites:subject");

  const data = useFetch<SearchData>("/search.json");

  const mapped = useMemo(
    () => [
      ...courseFavorites.map((el) => ({
        type: "kurs",
        href: "/gy11/course/[id]",
        as: `/gy11/course/${el}`,
        title: data.find((dEl) => dEl.code === el).title as string,
      })),
      ...subjectFavorites.map((el) => ({
        type: "ämne",
        href: "/gy11/subject/[id]",
        as: `/gy11/subject/${el}`,
        title: data.find((dEl) => dEl.code === el).title as string,
      })),
    ],
    [data, courseFavorites, subjectFavorites]
  );

  mapped.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <div className="favorites">
        <h2>Dina favoriter</h2>
        {mapped.length === 0 && (
          <p key="info">
            {/* Du har ännu inte lagt till något som dina favoriter. Detta gör du
          genom att trycka på favoritmarkera-knappen på sidorna för kurser,
          ämnen och program! */}
            Du har ännu inte lagt till något som dina favoriter. Detta gör du
            genom att trycka på favoritmarkera-knappen på sidorna för kurser och
            ämnen!
          </p>
        )}
        {mapped.length > 0 && (
          <p key="info">
            {/* Du kan lägga till fler favoriter genom att trycka på
          favoritmarkera-knappen på sidorna för kurser, ämnen och program! */}
            Du kan lägga till fler favoriter genom att trycka på
            favoritmarkera-knappen på sidorna för kurser och ämnen!
          </p>
        )}

        {mapped.length > 0 && (
          <ul>
            {mapped.map((el) => (
              <li key={el.as}>
                <Link className="link" href={el.href} as={el.as}>
                  <b>{el.type}</b>: {el.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <SearchPreload />
        <style jsx>{`
          ul {
            margin: 16px 0;
            padding: 0 0 0 20px;
          }
          li {
            list-style: none;
            position: relative;
            line-height: 20px;
          }

          li + li {
            margin-top: 10px;
          }

          li.nonApplicable {
            color: #666;
          }

          li::before {
            content: "";
            position: absolute;
            left: -10px;
            top: 10px;
            -khtml-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            width: 4px;
            height: 4px;
            background: #d44700;
          }

          .favorites {
            animation: enter 200ms forwards;
            min-height: 200px;
          }

          p {
            padding-top: 0.5em;
            margin: 0;
          }

          @keyframes enter {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </>
  );
};
