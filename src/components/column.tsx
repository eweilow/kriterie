import clsx from "clsx";
import { PropsWithChildren } from "react";

export const Column = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <section className={clsx("column", className)}>
    {children}
    <style jsx>{`
      .column {
        display: block;
        padding-left: 8px;
        padding-right: 8px;
        box-sizing: content-box;
        max-width: 1000px;
        margin: 0 auto;
      }

      @media (max-width: 750px) {
        .column {
          padding-left: 4px;
          padding-right: 4px;
        }
      }
    `}</style>
  </section>
);
