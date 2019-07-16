import Cell from "./app/Cell";

export default class Board {
  constructor() {
    this.board = [
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()]
    ];
  }

  placeCard(row, column, card) {
    this.getCell(row, column).placeCard(card);
  }

  getCell(row, column) {
    return this.board[row][column];
  }

  cellExists(row, column) {
    return this.board[row] && this.board[row][column];
  }
}
