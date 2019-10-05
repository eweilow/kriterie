import { useTouchResponder } from "./touchResponder/useTouchResponder";

import Link from "next/link";

import clsx from "clsx";

const ProgramLink: React.FC<{ code: string; applicable: boolean }> = ({
  code,
  applicable
}) => {
  const [props, element] = useTouchResponder<HTMLAnchorElement>("#d44700", 0.2);
  return (
    <Link href="/gy11/program/[id]" as={`/gy11/program/${code}`}>
      <a {...props} className={clsx({ applicable })}>
        {code}
        {element}
        <style jsx>{`
          a {
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            height: 40px;
            width: 100%;
            color: #d44700;
            font-weight: bold;
            list-style: none;
            padding: 0;
            margin: 0;
            overflow: hidden;
            position: relative;
          }
          a:not(.applicable) {
            color: #d4470048;
          }
        `}</style>
      </a>
    </Link>
  );
};

export const ApplicableProgrammesList: React.FC<{
  programmes: Array<{ title: string; code: string; applicable: boolean }>;
}> = ({ programmes }) => {
  return (
    <section className="programmes">
      <ul>
        {programmes.map(el => (
          <li key={el.code}>
            <ProgramLink {...el} />
          </li>
        ))}
        {programmes.map(el => (
          <li key={el.code}></li>
        ))}
      </ul>
      <style jsx>{`
        .programmes ul {
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
        }

        .programmes ul li {
          flex-grow: 1;
          list-style: none;
          margin: 0;
          min-width: 40px;
        }
        .programmes ul li::before {
          display: none;
        }
      `}</style>
    </section>
  );
};
