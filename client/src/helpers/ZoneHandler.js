export default class ZoneHandler {

  constructor(scene) {
    this.renderZone = (x, y, w, h) => {
      let dropZone = scene.add.zone(x, y, w, h).setRectangleDropZone(w, h);
      dropZone.setData({
        "cards": 0
      });
      return dropZone;
    }

    this.renderOutline = (dropZone, thickness = 10) => {
      let dropZoneOutline = scene.add.graphics();
      dropZoneOutline.lineStyle(thickness, 0xff69b4);
      dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
      dropZone.setData("outline", dropZoneOutline);
    }
  }
}

