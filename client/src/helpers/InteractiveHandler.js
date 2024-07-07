
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
      scene.GameHandler.canPickup = false;
      scene.socket.emit('pickupCard', scene.socket.id);
    })

    scene.input.on('pointerover', (pointer, object) => {

    })

    scene.input.on('pointerdown', (pointer, object) => {
      try {
        if (object[0].data.values['type'] == "viewOwnCard") {
          let index = object[0].data.values['index'];
          if (scene.GameHandler.playerHand[index] == []) {
            return
          }
          scene.GameHandler.viewOwnCards.forEach((button) => button.setVisible(false));
          scene.socket.emit('viewOwnCard', scene.socket.id, index);
        }

        if (object[0].data.values['type'] == "viewOpponentCard") {
          let index = object[0].data.values['index'];
          if (scene.GameHandler.playerHand[index] == []) {
            return
          }
          scene.GameHandler.viewOwnCards.forEach((button) => button.setVisible(false));
          scene.socket.emit('viewOpponentCard', scene.socket.id, object[0].data.values['socket'], index);
        }
      }
      catch (error) {
        return
      }

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
        //must be discarding the picked up card
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
          if (scene.GameHandler.oppZones.includes(dropZone)) {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            return
          }
          const index = Math.floor(dropZone.x / 155) - 1;
          let card = scene.GameHandler.playerHand[index];
          if ((card == null) || (card.length == 0)) {
            console.log("trying to swap with empty card");
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            return
          }
          Phaser.Display.Align.In.Center(card, scene.discardArea);
          scene.children.bringToTop(card);
          scene.GameHandler.playerHand[index] = gameObject;
          //scene.GameHandler.discard.push(card);
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

        //must be using power to swap own card with another hand
        if (scene.GameHandler.oppZones.includes(dropZone)) {
          let opp_index = scene.GameHandler.oppZones.indexOf(dropZone);
          console.log("swapping own card with card from another hand");
          let own_index = gameObject.data.values['index'];
          Phaser.Display.Align.In.Center(scene.pickupObject, scene.discardArea);
          scene.GameHandler.discard.push(gameObject);
          scene.socket.emit('jqPower', scene.socket.id, opp_index, own_index, gameObject.data.values, scene.pickupObject.data.values);
          scene.pickupObject = [];
        }

      }
      //must be using power to swap opp card with own hand
      if (scene.GameHandler.player2Hand.includes(gameObject)) {
        if (scene.handZones.includes(dropZone)) {
          let own_index = scene.handZones.indexOf(dropZone);
          console.log("swapping opp card with card from own hand");
          let opp_index = gameObject.data.values['index'];
          Phaser.Display.Align.In.Center(scene.pickupObject, scene.discardArea);
          scene.GameHandler.discard.push(gameObject);
          gameObject.x = gameObject.input.dragStartX;
          gameObject.y = gameObject.input.dragStartY;
          scene.socket.emit('jqPower', scene.socket.id, opp_index, own_index, gameObject.data.values, scene.pickupObject.data.values);
          scene.pickupObject = [];
        }
      }

      //else dropped card is from discard
      else {
        //swapping discard card with card from hand
        if ((scene.GameHandler.getPickup() == true) && (scene.GameHandler.getTurn() == true)) {
          if (scene.handZones.includes(dropZone)) {
            let index = scene.handZones.indexOf(dropZone);
            console.log("swapping discarded card with card from hand: " + index);
            let card = scene.GameHandler.playerHand[index];
            Phaser.Display.Align.In.Center(gameObject, dropZone);
            Phaser.Display.Align.In.Center(card, scene.discardArea);
            scene.GameHandler.playerHand[index] = gameObject;
            //scene.GameHandler.discard.push(card);
            scene.socket.emit('swappedHandDiscard', scene.socket.id, gameObject.data.values, index);
            scene.pickupCardText.setVisible(false);
          }
        } else {
          gameObject.x = gameObject.input.dragStartX;
          gameObject.y = gameObject.input.dragStartY;

        }

      }
    })
  }
}