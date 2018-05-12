class Canvas {
  constructor(canvas, context) {
    this.canvas = canvas
    this.context = context
    context.scale(20, 20)
  }

  drawBoard() {
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)

    drawMatrix(arena, {
      x: 0,
      y: 0
    })
    drawMatrix(player.matrix, player.pos)
  }

  drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = colors[value];
          context.fillRect(x + offset.x,
            y + offset.y,
            1, 1)
        }
      })
    })
  }

}

class Player {
  constructor() {
    this.pos = {
        x: 0,
        y: 0
      }
    this.matrix = null
    this.score = 0
  }
}

class Game {
  constructor() {
    this.arena = this.createMatrix()
    this.pieces = this.createPieces()
    this.player = new Player()
  }

  arenaSweep() {
    let rowCount = 1;
    outer: for (let y = this.arena.length - 1; y > 0; --y) {
      for (let x = 0; x < this.arena[y].length; ++x) {
        if (this.arena[y][x] === 0) {
          continue outer;
        }
      }

      const row = this.arena.splice(y, 1)[0].fill(0);
      this.arena.unshift(row);
      ++y;

      player.score += rowCount * 10;
      rowCount *= 2;
    }
  }

  newPiece() {
    const pieces = 'TJLOSZI';
    this.player.matrix = this.pieces[(pieces[pieces.length * Math.random() | 0])];
    this.player.pos.y = 0;
    this.player.pos.x = (this.arena[0].length / 2 | 0) - (this.player.matrix[0].length / 2 | 0);
    if (this.collide(this.arena, this.player)) {
      this.arena.forEach(row => row.fill(0));
      this.player.score = 0;
      this.updateScore();
    }
  }

  collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (m[y][x] !== 0 &&
          (arena[y + o.y] &&
            arena[y + o.y][x + o.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  createPieces() {
    return {
      'I': [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      'L': [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 2],
      ],
      'J': [
        [0, 3, 0],
        [0, 3, 0],
        [3, 3, 0],
      ],
      'O': [
        [4, 4],
        [4, 4],
      ],
      'Z': [
        [5, 5, 0],
        [0, 5, 5],
        [0, 0, 0],
      ],
      'S': [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ],
      'T': [
        [0, 7, 0],
        [7, 7, 7],
        [0, 0, 0],
      ]
    }
  }

  createMatrix(w, h) {
    const matrix = []
    while (h--) {
      matrix.push(new Array(w).fill(0))
    }
    return matrix
  }
}