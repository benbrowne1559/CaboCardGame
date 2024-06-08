import Card from "./Card";

export default class NormalCard extends Card {
  constructor(scene, cardName) {
    super(scene);
    this.name = 'normal';
    this.playerCardSprite = cardName;
    this.player2CardSprite = 'cardBack';
  }
}