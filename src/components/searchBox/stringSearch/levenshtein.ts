let matrix: number[][];
const matrixSize = 60;

function recreateMatrix() {
  matrix = [];
  for (let _i = 0; _i < matrixSize; _i++) {
    matrix.push([]);
    for (let _j = 0; _j < matrixSize; _j++) {
      matrix[_i].push(0);
    }
  }
}

export function levenshteinDistance(a: string, b: string) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  if (a.length > matrixSize) {
    a = a.slice(0, matrixSize - 1);
  }
  if (b.length > matrixSize) {
    b = b.slice(0, matrixSize - 1);
  }

  if (matrix == null) {
    console.info("[Search] Recreating matrix: is null");
    recreateMatrix();
  }
  if (matrix.length !== matrixSize) {
    console.info("[Search] Recreating matrix: matrix.length !== matrixSize");
    recreateMatrix();
  }
  for (let _j = 0; _j < matrixSize; _j++) {
    if (matrix[_j].length !== matrixSize) {
      console.info(
        "[Search] Recreating matrix: matrix[_j].length !== matrixSize"
      );
      recreateMatrix();
    }
  }

  let i: number;
  for (i = 0; i <= b.length; i++) {
    matrix[i][0] = i;
  }

  let j: number;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }

  return matrix[b.length][a.length];
}
