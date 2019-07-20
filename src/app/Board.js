import Cell from "./Cell";

export default class Board {
  constructor() {
    this.rows = [
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()]
    ];
  }

  placeCard(row, column, card) {
    const cell = this.getCell(row, column);

    cell.placeCard(card);

    this.compareCards(row, column, card);
  }

  compareCards(row, column, card) {
    this.check(row - 1, column, "bottom", card.top, card.belongsTo);
    this.check(row + 1, column, "top", card.bottom, card.belongsTo);
    this.check(row, column + 1, "left", card.right, card.belongsTo);
    this.check(row, column - 1, "right", card.left, card.belongsTo);
  }

  check(row, column, direction, amount, player) {
    const cell = this.getCell(row, column);

    if (
      cell &&
      cell.hasCard &&
      cell.card.doesNotBelongTo(player) &&
      cell.card.directionIsLessThan(direction, amount)
    ) {
      cell.card.flip();
    }
  }

  getCell(row, column) {
    if (this.cellExists(row, column)) {
      return this.rows[row][column];
    }
  }

  cellExists(row, column) {
    return this.rows[row] && this.rows[row][column];
  }

  getCellsBelongingToPlayer(player) {
    return this.rows.flat().filter(cell => {
      return cell.hasCard && cell.card.belongsTo === player;
    });
  }

  isFull() {
    console.log(
      this.rows.flat().filter(cell => {
        return cell.hasCard;
      }).length
    );
    return (
      this.rows.flat().filter(cell => {
        return cell.hasCard;
      }).length === 8
    );
  }
}
