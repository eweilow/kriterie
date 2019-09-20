export const Column: React.FC = ({ children }) => (
  <section className="column">
    {children}
    <style jsx>{`
      .column {
        display: block;
        box-sizing: border-box;
        max-width: 800px;
        margin: 0 auto;
      }
    `}</style>
  </section>
);
