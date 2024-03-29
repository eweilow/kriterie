import { PropsWithChildren } from "react";

export const CriteriaGrade = ({
  grade,
  children,
}: PropsWithChildren<{ grade: any }>) => (
  <section className="criteriaGrade">
    <header>{grade}</header>
    <div>{children}</div>
    <style jsx>{`
      .criteriaGrade {
        display: flex;
      }

      .criteriaGrade + .criteriaGrade {
        margin-top: 16px;
      }

      header {
        font-weight: bold;
        font-size: 16px;
        text-align: center;
        width: 30px;
        flex-shrink: 0;
        box-sizing: border-box;
      }
    `}</style>
  </section>
);
