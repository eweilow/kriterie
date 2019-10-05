import { useTouchResponder } from "./touchResponder/useTouchResponder";

import Link from "next/link";

import clsx from "clsx";

const LetterLink: React.FC<{
  letter: string;
  href: string;
  as: string;
  applicable: boolean;
}> = ({ letter, href, as, applicable }) => {
  const [props, element] = useTouchResponder<HTMLAnchorElement>("#d44700", 0.2);
  return (
    <Link href={href} as={as}>
      <a {...props} className={clsx({ applicable })}>
        {letter}
        {element}
        <style jsx>{`
          a {
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            height: 40px;
            width: 40px;
            color: #d44700;
            font-weight: bold;
            list-style: none;
            padding: 0;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
            box-sizing: border-box;
          }
          a:not(.applicable) {
            color: #d4470048;
          }

          a.applicable {
            border: 2px solid currentColor;
            border-radius: 4px;
          }
        `}</style>
      </a>
    </Link>
  );
};

export const LettersList: React.FC<{
  letters: string[];
  activeLetter: string;
  formatHref: (letter: string) => string;
  formatAs: (letter: string) => string;
}> = ({ letters, activeLetter, formatHref, formatAs }) => {
  return (
    <section className="letters">
      <header>vald bokstav:</header>
      <ul>
        {letters.map(el => (
          <li key={el}>
            <LetterLink
              applicable={activeLetter === el}
              letter={el.toUpperCase()}
              as={formatAs(el)}
              href={formatHref(el)}
            />
          </li>
        ))}
        {letters.map(el => (
          <li key={el}></li>
        ))}
      </ul>
      <style jsx>{`
        header {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 8px;

          color: #888;
        }
        .letters ul {
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
        }

        .letters ul li {
          flex-grow: 1;
          list-style: none;
          margin: 0;
          min-width: 40px;
        }
        .letters ul li::before {
          display: none;
        }
      `}</style>
    </section>
  );
};
