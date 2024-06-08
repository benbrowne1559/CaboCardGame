export default class InteractiveHandler {

  constructor(scene) {

    scene.deckArea.on('pointerdown', () => {
      if (scene.canPickup == false) {
        return
      }
      console.log("pickup card");
      scene.socket.emit('pickupCard', scene.socket.id);
      scene.canPickup = false;
    })
    scene.discardArea.on('pointerdown', () => {
      console.log('in_discard');
    })

    scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    })

    scene.input.on('dragstart', (pointer, gameObject) => {
      gameObject.setTint(0xff69b4);
      scene.children.bringToTop(gameObject);
      scene.cardPreview.setVisible(false);
    })

    scene.input.on('dragend', (pointer, gameObject, dropped) => {
      gameObject.setTint();
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    })
  }
}