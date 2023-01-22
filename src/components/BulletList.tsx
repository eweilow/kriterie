import clsx from "clsx";
import { Children, PropsWithChildren } from "react";

export function BulletList(props: PropsWithChildren<{ className?: string }>) {
  return (
    <ul className={clsx(props.className, "pl-5")}>
      {Children.map(props.children, (item) => (
        <li className="relative py-0.5 before:absolute before:top-1/2 before:-left-3 before:-translate-y-1/2 before:content-[''] before:block before:bg-orange-800 before:w-1 before:h-1">
          {item}
        </li>
      ))}
    </ul>
  );
}
