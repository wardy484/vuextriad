export default class Hand {
  constructor(cards) {
    this.cards = cards;
  }

  removeCard(index) {
    this.cards = this.cards.filter(function(value, key) {
      return key !== index;
    });
  }

  getCard(index) {
    return this.cards[index];
  }
}
