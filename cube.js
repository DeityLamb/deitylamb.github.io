const CUBE_NODES = [
  [-1, -1, -1], [-1, -1, 1],
  [-1, 1, -1], [-1, 1, 1],
  [1, -1, -1], [1, -1, 1],
  [1, 1, -1], [1, 1, 1]
]

const CUBE_EDGES = [
  [0, 1], [1, 3], [3, 2],
  [2, 0], [4, 5], [5, 7],
  [7, 6], [6, 4], [0, 4],
  [1, 5], [2, 6], [3, 7]
]

const TESSERACT_NODES = [
  [-1, -1, -1], [-1, -1, 1],
  [-1, 1, -1], [-1, 1, 1],
  [1, -1, -1], [1, -1, 1],
  [1, 1, -1], [1, 1, 1]
]

const TESSERACT_EDGES = [
  [8, 9], [9, 11], [11, 10],
  [10, 8], [12, 13], [13, 15],
  [15, 14], [14, 12], [8, 12],
  [9, 13], [10, 14], [11, 15],

  [0, 8], [1, 9], [3, 11],
  [2, 10], [4, 12], [5, 13],
  [7, 15], [6, 14]
]

export class Cube {

  nodes = CUBE_NODES;
  edges = CUBE_EDGES;

  constructor(size) {
    this.scale(size, size, size);
  }

  scale(factorX, factorY, factorZ) {
    this.nodes = this.nodes.map(([x, y, z]) => [
      x * factorX,
      y * factorY,
      z * factorZ
    ]);
  }

  rotate(angleX, angleY) {
    const sinX = Math.sin(angleX);
    const cosX = Math.cos(angleX);

    const sinY = Math.sin(angleY);
    const cosY = Math.cos(angleY);

    for (const node of this.nodes) {
      const [x, y, z] = node;

      node[0] = x * cosX - z * sinX;
      node[1] = y * cosY - (z * cosX + x * sinX) * sinY;
      node[2] = (z * cosX + x * sinX) * cosY + y * sinY;
    }
  }
}

export class StaticTesseract extends Cube {
  constructor(size) {
    super(size);
    const nodes = TESSERACT_NODES
      .map((arr) => arr.map(v => v / 3))
      .map(([x, y, z]) => [x * size, y * size, z * size]);
    
    this.nodes.push(...nodes);

    this.edges.push(...TESSERACT_EDGES);

  }
}
