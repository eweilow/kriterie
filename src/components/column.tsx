import clsx from "clsx";
import { PropsWithChildren } from "react";

export const Column = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <section
    className={clsx("px-2 md:px-4 box-content max-w-5xl mx-auto", className)}
  >
    {children}
  </section>
);
