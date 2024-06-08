export default class Card {
  constructor(scene) {
    this.render = (x, y, value, scale) => {
      let sprite = this.playerCardSprite;
      let card = scene.add.image(x, y, sprite).setScale(scale, scale).setInteractive().setData({
        "name": this.name,
        //"value": value,
        "sprite": sprite
      });
      return card;

    }
  }
}