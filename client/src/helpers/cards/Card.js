export default class Card {
  constructor(scene) {
    this.render = (x, y, type, scale) => {
      let sprite = this.playerCardSprite;
      let card = scene.add.image(x, y, sprite).setScale(scale, scale).setInteractive().setData({
        "name": this.name,
        "sprite": sprite
      });
      if (type === 'playerCard') {
        scene.input.setDraggable(card);
        scene.children.bringToTop(card);
      }
      return card;

    }
  }
}