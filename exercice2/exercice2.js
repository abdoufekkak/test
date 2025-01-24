// Étape 1 : Multiplication de matrices
function multiplyMatrices(A, B) {
    const rowsA = A.length, colsA = A[0].length;
    const rowsB = B.length, colsB = B[0].length;
  
    if (colsA !== rowsB) throw new Error("Les dimensions des matrices ne permettent pas une multiplication.");
  
    const result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));
    for (let i = 0; i < rowsA; i++) {
      for (let j = 0; j < colsB; j++) {
        for (let k = 0; k < colsA; k++) {
          result[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    return result;
  }
  
  // Matrices
  const A = [
    [1, 2, 3],
    [4, 5, 6]
  ];
  const B = [
    [10, 11],
    [13, 14],
    [16, 17]
  ];
  
  console.log("Résultat de A x B :", multiplyMatrices(A, B));
  
  // Étape 2 : Matrice de rotation autour de D1
  function rotationMatrixAroundAxis(axis, angle) {
    const [u, v, w] = axis;
    const cosTheta = Math.cos(angle);
    const sinTheta = Math.sin(angle);
    const oneMinusCos = 1 - cosTheta;
  
    return [
      [
        cosTheta + u ** 2 * oneMinusCos,
        u * v * oneMinusCos - w * sinTheta,
        u * w * oneMinusCos + v * sinTheta
      ],
      [
        v * u * oneMinusCos + w * sinTheta,
        cosTheta + v ** 2 * oneMinusCos,
        v * w * oneMinusCos - u * sinTheta
      ],
      [
        w * u * oneMinusCos - v * sinTheta,
        w * v * oneMinusCos + u * sinTheta,
        cosTheta + w ** 2 * oneMinusCos
      ]
    ];
  }
  
  // Rotation autour de D1
  const axis = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)]; // Normalisation de (1, 1, 1)
  const angle = Math.PI / 4; // Exemple : 45 degrés
  console.log("Matrice de rotation :", rotationMatrixAroundAxis(axis, angle));
  
  // Étape 3 : Projection orthogonale pour garder les couleurs dans le cube
  function projectToRGB(c) {
    return c.map(value => Math.max(0, Math.min(255, value)));
  }
  
  // Exemple : couleur transformée après rotation
  const C1 = [300, 200, -50]; // Exemple (à remplacer par le résultat de la rotation)
  const C2 = projectToRGB(C1);
  console.log("C2 après projection dans le cube RGB :", C2);