export default class Card {
  constructor({ id, name, top, right, bottom, left, belongsTo }) {
    this.id = id;
    this.name = name;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.belongsTo = belongsTo;
  }

  flip() {
    this.belongsTo = this.belongsTo === 1 ? 2 : 1;
  }

  directionIsLessThan(direction, amount) {
    return this[direction] < amount;
  }

  doesNotBelongTo(player) {
    return this.belongsTo !== player;
  }
}
