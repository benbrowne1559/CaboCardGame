export default class Card {
  constructor(scene) {
    this.render = (x, y, value) => {
      let sprite = this.playerCardSprite;
      let card = scene.add.image(x, y, sprite).setScale(0.26, 0.26).setInteractive().setData({
        "name": this.name,
        //"value": value,
        "sprite": sprite
      });
      return card;

    }
  }
}