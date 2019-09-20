export const Column: React.FC = ({ children }) => (
  <section className="column">
    {children}
    <style jsx>{`
      .column {
        display: block;
        padding: 0 8px;
        box-sizing: content-box;
        max-width: 800px;
        margin: 0 auto;
      }
    `}</style>
  </section>
);
