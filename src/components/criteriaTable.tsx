function computeProbability(x: number, mu: number, sigma: number) {
  const dt = 0.1;
  let sum = 0;
  for (let i = 0; i < 1000; i++) {
    const increment =
      ((dt * 1) / Math.sqrt(2 * Math.PI * sigma * sigma)) *
      Math.exp(-Math.pow(x - mu, 2) / (2 * sigma * sigma));
    sum += increment;
    x += dt;
    if (increment < 1e-3) {
      break;
    }
  }
  return sum;
}

export const CriteriaTable = ({
  from,
  to,
  distanceFn,
}: {
  from: string[][];
  to: string[][];
  distanceFn: (a: string, b: string) => number;
}) => {
  return (
    <table>
      <tr>
        <td />
        {to.map((el2, i2) => {
          return <td key={i2}>{i2}</td>;
        })}
      </tr>
      {from.map((el, i) => {
        const combined = el.join(" ");

        const scores = to.map((el2) => {
          const combined2 = el2.join(" ");
          return {
            key: combined2,
            value: distanceFn(combined, combined2),
          };
        });

        const maxScore = Math.max(...scores.map((el) => el.value));

        const mean =
          scores.reduce((prev, curr) => prev + curr.value, 0) / scores.length;
        const variance =
          scores.reduce(
            (prev, curr) => prev + Math.pow(curr.value - mean, 2),
            0
          ) / scores.length;
        const stDev = Math.sqrt(variance);

        return (
          <tr key={combined}>
            <td>{i}</td>
            {scores.map(({ key, value }) => {
              return (
                <td className={value === maxScore ? "max" : ""} key={key}>
                  {(value * 100).toFixed(0)}%
                </td>
              );
            })}
            <td>{(mean * 100).toFixed(0)}%</td>
            <td>{(variance * 100).toFixed(0)}%</td>
            <td>{(stDev * 100).toFixed(0)}%</td>
            <td>
              {((1 - computeProbability(maxScore, mean, stDev)) * 100).toFixed(
                1
              )}
              %
            </td>
            <td>
              {(
                maxScore *
                (1 - computeProbability(maxScore, mean, stDev)) *
                100
              ).toFixed(1)}
              %
            </td>
          </tr>
        );
      })}
      <style jsx>{`
        table {
          border-collapse: collapse;
        }
        td {
          border: 1px solid gray;
          padding: 4px;
        }
        td.max {
          font-weight: bold;
        }
      `}</style>
    </table>
  );
};
