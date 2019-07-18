export default class Hand {
  constructor(cards) {
    this.cards = cards;
  }

  removeCard(index) {
    this.cards = this.cards.filter((value, key) => {
      return key !== index;
    });
  }

  removeCardByName(card) {
    this.cards = this.cards.filter(existingCard => {
      return existingCard.name !== card.name;
    });
  }

  addCard(card) {
    if (this.cards.length < 5) {
      this.cards.push({ ...card });
    }
  }

  getCard(index) {
    return this.cards[index];
  }

  contains(card) {
    return (
      this.cards.filter(existingCard => {
        return existingCard.name === card.name;
      }).length > 0
    );
  }
}
