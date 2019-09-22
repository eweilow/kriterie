import { levenshteinDistance } from "./levenshtein";
import { diceCoefficient } from "./diceCoefficient";
import { jaroWinklerDistance } from "./jaroWinkler";

function startPosition(a: string, b: string) {
  var start = a.indexOf(b);
  if (start < 0) start = 1;
  else start /= a.length;
  start = 1 - start;
  return start;
}

export function averageDistance(a: string, b: string) {
  if (a === b) return 1;

  var start = startPosition(a, b);
  var levensthein = Math.min(1.0 / (levenshteinDistance(a, b) + 1), 1.0);
  var jaro = jaroWinklerDistance(a, b);
  var dice = diceCoefficient(a, b);

  var dist = (jaro + dice + levensthein + start) / 4.0;
  return dist;
}
