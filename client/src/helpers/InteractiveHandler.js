
export default class InteractiveHandler {

  constructor(scene) {

    scene.deckArea.on('pointerdown', () => {
      ///if ((scene.canPickup == false) || (scene.GameHandler.getTurn() == false)) {
      /// scene.notTurnText.setVisible(true);
      // return
      //}
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
      if (gameObject == scene.pickupObject) {
        gameObject.setTint(0xFFFF00);
        scene.pickupCardText.setVisible(true);
        scene.children.bringToTop(gameObject);
      }
    })



    scene.input.on('dragend', (pointer, gameObject, dropped) => {
      gameObject.setTint();
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    })

    scene.input.on('drop', (pointer, gameObject, dropZone) => {
      if (gameObject == scene.pickupObject) {
        Phaser.Display.Align.In.Center(gameObject, dropZone);
        const index = Math.floor(dropZone.x / 155) - 1;
        let card = scene.GameHandler.playerHand[index];
        card.x = 700;
        card.y = 500;
        scene.GameHandler.playerHand[index] = gameObject;
        console.log(scene.GameHandler.playerHand);
        scene.GameHandler.swappedCard = true;
        //emit card swapped event
      } else {
        Phaser.Display.Align.In.Center(gameObject, dropZone);
      }

      //scene.input.setDraggable(gameObject, false);
      let card = gameObject['data']['list']['sprite'];
      scene.socket.emit('cardDiscarded', card, scene.socket.id);
    })
  }
}