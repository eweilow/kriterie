import Link from "next/link";

import clsx from "clsx";

const LetterLink = ({
  letter,
  href,
  applicable,
}: {
  letter: string;
  href: string;
  applicable: boolean;
}) => {
  return (
    <Link
      className={clsx(
        "h-9 w-9 flex items-center justify-center font-bold box-border rounded border-2 relative active:bg-orange-100 ",
        {
          "border-transparent text-gray-400 hover:bg-gray-100": !applicable,
          "border-orange-500 text-orange-700": applicable,
        }
      )}
      href={href}
    >
      {letter}
    </Link>
  );
};

export const LettersList = ({
  letters,
  activeLetter,
  formatHref,
}: {
  letters: string[];
  activeLetter: string;
  formatHref: (letter: string) => string;
}) => {
  return (
    <section>
      <header className="text-gray-500 font-bold mb-4">vald bokstav:</header>
      <ul className="flex gap-1 flex-wrap">
        {letters.map((el) => (
          <li key={el}>
            <LetterLink
              applicable={activeLetter === el}
              letter={el.toUpperCase()}
              href={formatHref(el)}
            />
          </li>
        ))}
        {letters.map((el) => (
          <li key={el + "2"}></li>
        ))}
      </ul>
    </section>
  );
};
