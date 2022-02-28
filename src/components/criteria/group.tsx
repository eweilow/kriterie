export const CriteriaGroup: React.FC = ({ children }) => (
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
