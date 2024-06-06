import ZoneHandler from "./ZoneHandler";

export default class UIHandler {

  constructor(scene) {

    this.zoneHandler = new ZoneHandler(scene);

    this.buildZones = () => {
      scene.dropZone = this.zoneHandler.renderZone(470, 500);
      this.zoneHandler.renderOutline(scene.dropZone);

      scene.dropZone = this.zoneHandler.renderZone(1000, 500);
      this.zoneHandler.renderOutline(scene.dropZone);
    }

    this.buildDeckAreas = () => {
      scene.deckArea = scene.add.rectangle(470, 500, 200, 280);
      scene.deckArea.setStrokeStyle(10, 0xff69b4);

      scene.discardArea = scene.add.rectangle(1000, 500, 200, 280);
      scene.discardArea.setStrokeStyle(10, 0xff69b4);

    }

    this.buildPlayerAreas = () => {
      scene.playerHandArea = scene.add.rectangle(600, 860, 1100, 230);
      scene.playerHandArea.setStrokeStyle(4, 0xff69b4);

      scene.player2HandArea = scene.add.rectangle(600, 135, 1100, 230);
      scene.player2HandArea.setStrokeStyle(4, 0xff69b4);
    }

    this.buildGameText = () => {
      scene.pickupCard = scene.add.text(960, 445, "Pickup Card").setFontSize(18).setFontFamily("Trebuchet MS");
      scene.discard = scene.add.text(440, 445, "Discard").setFontSize(18).setFontFamily("Trebuchet MS");

    }

    this.buildUI = () => {
      //this.buildZones();
      this.buildPlayerAreas();
      this.buildDeckAreas();
      this.buildGameText();

    }
  }
}