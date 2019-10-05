import { useFavorite } from "../../lib/useFavorite";
import { getSafeUrl } from "../../lib/safeUrl";
import { useFetch } from "../../lib/useFetch";
import { useMemo, useLayoutEffect } from "react";
import { getSearchData } from "../../api/search";
import Link from "next/link";

function useFavorites(key: string): string[] {
  const [, , , state] = useFavorite(key, "");

  return state as string[];
}
export const FavoritesList: React.FC = () => {
  const courseFavorites = useFavorites("kriterie:favorites:course");
  const subjectFavorites = useFavorites("kriterie:favorites:subject");
  const programFavorites = useFavorites("kriterie:favorites:program");

  const url = getSafeUrl("/api/search", undefined);
  const data = useFetch<ReturnType<typeof getSearchData>>(url);

  const mapped = useMemo(
    () => [
      ...courseFavorites.map(el => ({
        type: "kurs",
        href: "/gy11/course/[id]",
        as: `/gy11/course/${el}`,
        title: data.find(dEl => dEl.code === el).title as string
      })),
      ...subjectFavorites.map(el => ({
        type: "ämne",
        href: "/gy11/subject/[id]",
        as: `/gy11/subject/${el}`,
        title: data.find(dEl => dEl.code === el).title as string
      })),
      ...programFavorites.map(el => ({
        type: "program",
        href: "/gy11/program/[id]",
        as: `/gy11/program/${el}`,
        title: data.find(dEl => dEl.code === el).title as string
      }))
    ],
    [data, courseFavorites, subjectFavorites, programFavorites]
  );

  mapped.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="favorites">
      {mapped.length === 0 && (
        <p key="info">
          Du har ännu inte lagt till något som dina favoriter. Detta gör du
          genom att trycka på favoritmarkera-knappen på sidorna för kurser,
          ämnen och program!
        </p>
      )}
      {mapped.length > 0 && (
        <p key="info">
          Du kan lägga till fler favoriter genom att trycka på
          favoritmarkera-knappen på sidorna för kurser, ämnen och program!
        </p>
      )}

      {mapped.length > 0 && (
        <ul>
          {mapped.map(el => (
            <li key={el.as}>
              <Link href={el.href} as={el.as}>
                <a>
                  <b>{el.type}</b>: {el.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
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
  );
};

export const FavoritesListFallback: React.FC = () => null;
