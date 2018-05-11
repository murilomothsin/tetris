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

class Game {
  constructor() {
    this.matrix = this.createMatrix()
    this.pieces = this.createPieces()
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