export default class Card {
  constructor(scene) {
    this.render = (x, y, value) => {
      let sprite;
      if (type == 'playerCard') {
        sprite = this.playerCardSprite;
      } else {
        sprite = this.player2CardSprite;
      }
      let card = scene.add.image(x, y, sprite).setScale(0.5, 0.5).setInteracive().setData({
        "name": this.name,
        "value": value,
        "sprite": sprite
      });
      if (type == 'playerCard') {
        scene.input.setDraggable(card);
      }
      return card;

    }
  }
}