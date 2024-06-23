const card_names = require('./image_names.json');

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
    this.discard = [];
  }

  createDeck() {
    card_names.forEach((card) => {
      card = card.split(".")[0];
      let card_split = card.split("_");
      let suit = card_split[2];
      let rank = card_split[0];
      let name = rank + suit;
      const [value, power] = this.getValue(suit, rank);
      this.deck.push([name, suit, rank, value, power]);
    })
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

  getValue(suit, rank) {
    let value = -10;
    let power = Powers.None;
    if (rank == 'king') {
      if ((suit == 'spades') || (suit == 'clubs')) {
        value = 13;
      } else {
        value = -1;
      }
      return [value, power]
    } else {
      if (rank == 'jack') {
        value = 11;
        power = Powers.JackQueen;
        return [value, power]
      }
      if (rank == 'queen') {
        value = 12;
        power = Powers.JackQueen;
        return [value, power]
      }
      if (rank == 'ace') {
        value = 1;
        return [value, power]
      }
      if ((rank == '7') || (rank == '8')) {
        value = parseInt(rank);
        power = Powers.SevenEight;
        return [value, power]
      }
      if ((rank == '9') || (rank == '10')) {
        value = parseInt(rank);
        power = Powers.NineTen;
        return [value, power]
      }
      value = parseInt(rank);
      return [value, power]
    }

  }

  convertCard(card) {
    let simple_card = [card['sprite'], card['suit'], card['face'], card['value'], card['power']];
    return simple_card
  }

  getIndexFromName(name, hand) {
    let i = 0;

    hand.forEach((card) => {
      let c = String(card[0].trim());
      let h = String(name.trim());
      if (c.includes(h)) {
        return i
      } else {
        i = i + 1;
      }
    })
    return -1
  }
}