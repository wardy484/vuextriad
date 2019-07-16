export default class Card {
  constructor({ id, name, top, right, down, left, belongsTo }) {
    this.id = id;
    this.name = name;
    this.top = top;
    this.right = right;
    this.down = down;
    this.left = left;
    this.belongsTo = belongsTo;
  }
}
