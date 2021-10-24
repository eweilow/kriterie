export const CriteriaLine: React.FC<{ dense: boolean }> = ({
  dense,
  children,
}) => (
  <div className={dense ? "dense" : "space"}>
    {children}
    <style jsx>{`
      div {
        display: block;
        line-height: 1.15;
      }
      div.dense {
        display: inline;
      }
      div.space {
        margin: 0.45em 0;
      }
      div.space:first-child {
        margin-top: 0;
      }
      div.space:last-child {
        margin-bottom: 0;
      }

      div::after {
        content: " ";
      }
    `}</style>
  </div>
);
