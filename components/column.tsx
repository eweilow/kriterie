import clsx from "clsx";

export const Column: React.FC<{ className?: string }> = ({
  children,
  className
}) => (
  <section className={clsx("column", className)}>
    {children}
    <style jsx>{`
      .column {
        display: block;
        padding: 0 8px;
        box-sizing: content-box;
        max-width: 1000px;
        margin: 0 auto;
      }
    `}</style>
  </section>
);
