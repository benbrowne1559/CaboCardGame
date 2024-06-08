import Card from "./Card.js"

export default class CardBackBig extends Card {
  constructor(scene, scale) {
    super(scene);
    this.name = 'cardBack';
    this.playerCardSprite = 'cardBack';
    this.player2CardSprite = 'cardBack';
    this.scale = 0.3;


  }
}