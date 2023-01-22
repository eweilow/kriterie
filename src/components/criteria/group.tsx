import { PropsWithChildren } from "react";

export const CriteriaGroup = ({ children }: PropsWithChildren<{}>) => (
  <section className="criteriaGroup">
    {children}
    <style jsx>{`
      .criteriaGroup {
        border-left: 2px solid #d44700;
      }

      :global(.criteriaGroup) + .criteriaGroup {
        margin-top: 32px;
      }
    `}</style>
  </section>
);
