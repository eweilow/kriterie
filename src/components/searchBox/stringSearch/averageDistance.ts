import { levenshteinDistance } from "./levenshtein";
import { diceCoefficient } from "./diceCoefficient";
import { jaroWinklerDistance } from "./jaroWinkler";

function startPosition(a: string, b: string) {
  let start = a.indexOf(b);
  if (start < 0) start = 1;
  else start /= a.length;
  start = 1 - start;
  return start;
}

export function averageDistance(a: string, b: string) {
  if (a === b) return 1;

  const start = startPosition(a, b);
  const levensthein =
    1 - levenshteinDistance(a, b) / (0.5 * (a.length + b.length));
  const jaro = jaroWinklerDistance(a, b);
  const dice = diceCoefficient(a, b);

  const dist = (jaro + dice + levensthein + start) / 4.0;
  return dist;
}
