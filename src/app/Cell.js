export default class Cell {
  constructor() {
    this.hasCard = false;
    this.card = null;
  }

  placeCard(card) {
    if (!this.hasCard && typeof card !== "undefined") {
      this.card = card;
      this.hasCard = true;
    }
  }
}
