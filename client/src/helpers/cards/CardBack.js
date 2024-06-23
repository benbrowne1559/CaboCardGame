import Card from "./Card.js"

export default class CardBack extends Card {
  constructor(scene, index) {
    super(scene);
    this.name = 'cardBack';
    //index: 0-8 for opposition hands, 10 for deck card
    this.index = index;
    this.playerCardSprite = 'cardBack';
    this.player2CardSprite = 'cardBack';


  }
}