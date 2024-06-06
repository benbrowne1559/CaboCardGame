const Powers = Object.freeze({
  None: 0,
  SevenEight: 1,
  NineTen: 2,
  JackQueen: 3,
})

module.exports = class Deck {
  constructor() {
    this.deck = [];
    this.createDeck();
    this.shuffleDeck();
  }

  createDeck() {
    let suits = ['clubs', 'spades', 'hearts', 'diamonds'];
    let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen'];
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let special_values = [13, 13, -1, -1]

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        let power = Powers.None;
        if (ranks[j] == ('7' || '8')) {
          power = Powers.SevenEight;
        }
        if (ranks[j] == ('9' || '10')) {
          power = Powers.NineTen;
        }
        if (ranks[j] == ('jack' || 'queen')) {
          power = Powers.JackQueen;
        }
        this.deck.push([suits[i], ranks[j], values[j], power]);
      }
      this.deck.push([suits[i], 'king', special_values[i], Powers.None]);
    }

  }
  shuffleDeck() {
    let currentIndex = this.deck.length;

    while (currentIndex != 0) {

      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.deck[currentIndex], this.deck[randomIndex]] = [
        this.deck[randomIndex], this.deck[currentIndex]];
    }
  }
  createHand() {
    let hand = [];
    for (let i = 0; i < 4; i++) {
      hand.push(this.deck.pop());
    }
    return hand;
  }
}