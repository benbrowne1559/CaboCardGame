import Card from "./Card";

export default class NormalCard extends Card {
  constructor(scene) {
    super(scene);
    this.name = 'normal';
    this.playerCardSprite = 'testCard';
    this.player2CardSprite = 'testCard';
  }
}