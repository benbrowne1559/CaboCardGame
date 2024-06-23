
export default class InteractiveHandler {

  constructor(scene) {

    scene.deckArea.on('pointerdown', () => {
      scene.secondMatchText.setVisible(false);
      if ((scene.GameHandler.getPickup() == false) || (scene.GameHandler.getTurn() == false)) {
        console.log(scene.GameHandler.getPickup(), scene.GameHandler.getTurn());
        scene.notTurnText.setVisible(true);
        return
      }
      console.log("pickup card");
      scene.socket.emit('pickupCard', scene.socket.id);
      scene.GameHandler.canPickup = false;
    })


    scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      scene.children.bringToTop(gameObject);
      if (gameObject == scene.pickupObject) {
        gameObject.setTint(0xFFFF00);
        scene.pickupCardText.setVisible(true);

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
        if (dropZone == scene.discardArea) {
          scene.GameHandler.discard.push(gameObject);
          scene.pickupCardText.setVisible(false);
          scene.children.bringToTop(gameObject);
          Phaser.Display.Align.In.Center(gameObject, dropZone);
          scene.pickupObject = [];
          scene.socket.emit('straightDiscard', scene.socket.id, gameObject.data.values);
          console.log("straightDiscard");
          //else swapping card with one from hand
        } else {
          const index = Math.floor(dropZone.x / 155) - 1;
          let card = scene.GameHandler.playerHand[index];
          if (card.length == 0) {
            console.log("trying to swap with empty card");
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            return
          }
          Phaser.Display.Align.In.Center(card, scene.discardArea);
          scene.children.bringToTop(card);
          scene.GameHandler.playerHand[index] = gameObject;
          scene.GameHandler.discard.push(card);
          scene.GameHandler.swappedCard = true;
          scene.pickupObject = [];
          console.log("swapped hand");
          scene.socket.emit('swappedHand', scene.socket.id, gameObject.data.values, index);
          scene.pickupCardText.setVisible(false);
        }

        return
      } //if pickup card is part of hand
      if (scene.GameHandler.playerHand.includes(gameObject)) {
        if (dropZone == scene.discardArea) {
          scene.GameHandler.lastDiscarded = gameObject;
          console.log("card from hand dropped, check if match");
          scene.socket.emit("checkMatch", scene.socket.id, gameObject.data.values, gameObject.input.dragStartX);
        }
        Phaser.Display.Align.In.Center(gameObject, dropZone);
        //else dropped card is from discard
      } else {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }

    })
  }
}