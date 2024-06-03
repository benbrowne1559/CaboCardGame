import ZoneHandler from "./ZoneHandler";

export default class UIHandler {

  constructor(scene) {

    this.ZoneHandler = new ZoneHandler(scene);

    this.buildZones = () => {
      scene.dropZone = this.ZoneHandler.renderZone(470, 500);
      this.ZoneHandler.renderOutline(scene.dropZone);

      scene.dropZone = this.ZoneHandler.renderZone(1000, 500);
      this.ZoneHandler.renderOutline(scene.dropZone);
    }

    this.buildPlayerAreas = () => {
      scene.playerHandArea = scene.add.rectangle(470, 860, 850, 230);
      scene.playerHandArea.setStrokeStyle(4, 0xff69b4);
      scene.playerDeckArea = scene.add.rectangle(1000, 860, 155, 215);
      scene.playerDeckArea.setStrokeStyle(3, 0x00ffff);

      scene.player2HandArea = scene.add.rectangle(470, 135, 850, 230);
      scene.player2HandArea.setStrokeStyle(4, 0xff69b4);
      scene.player2DeckArea = scene.add.rectangle(1000, 135, 155, 215);
      scene.player2DeckArea.setStrokeStyle(3, 0x00ffff);
    }

    this.buildGameText = () => {
      scene.pickupCard = scene.add.text(970, 445, "Pickup Card").setFontSize(18).setFontFamily("Trebuchet MS");
      scene.discard = scene.add.text(440, 445, "Discard").setFontSize(18).setFontFamily("Trebuchet MS");

    }

    this.buildUI = () => {
      this.buildZones();
      this.buildPlayerAreas();
      this.buildGameText();

    }
  }
}