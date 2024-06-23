import Card from "./Card";

export default class NormalCard extends Card {
  constructor(scene, cardName, suit, face, value, power, index) {
    super(scene);
    this.name = 'normal';
    this.suit = suit;
    this.face = face;
    this.value = value;
    this.power = power;
    this.index = index;
    this.playerCardSprite = cardName;
    this.player2CardSprite = 'cardBack';
  }
}