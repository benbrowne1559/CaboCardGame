import io from 'socket.io-client';
import ZoneHandler from "./ZoneHandler";

export default class SocketHandler {

  constructor(scene) {

    this.zoneHandler = new ZoneHandler(scene);

    scene.socket = io('http://localhost:3000');

    scene.socket.on('connect', () => {

      console.log("connected");
      scene.socket.emit('register', scene.socket.id);
    })

    scene.socket.on('firstTurn', () => {
      scene.GameHandler.changeTurn();
    })

    scene.socket.on('changeTurn', () => {
      scene.GameHandler.changeTurn();
    })

    scene.socket.on('changeGameState', (gameState) => {
      scene.GameHandler.changeGameState(gameState);
      if (gameState == 'Initializing') {
      }
      if (gameState == 'Dealing') {
        //onscreen text 'Dealing'
      }

    })

    scene.socket.on('dealingCards', (socketId, hand) => {
      if (socketId == scene.socket.id) {
        for (let i in hand) {
          let cardName = hand[i][0];

          let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(155 + (i * 155), 860, cardName, hand[i][1], hand[i][2], hand[i][3], hand[i][4], i, 'playerCard', 0.26));

          scene.GameHandler.viewOwnCards.push(scene.add.text(108 + (i * 155), 720, 'View Card', { fill: '#0f0' }).setData({ "type": "viewOwnCard", "index": i }).setInteractive().setVisible(false).setFontSize(20));

        }
        //render card back for deck area
        let deckCard = scene.DeckHandler.dealBackCard(1000, 500, 10, 0.33);
        scene.input.setDraggable(deckCard, false);
      }
      else {
        for (let i in hand) {
          let card = scene.GameHandler.player2Hand.push(scene.DeckHandler.dealBackCard(155 + (i * 155), 135, i, 0.26));
        }
      }
    })

    scene.socket.on('pickupCard', (socketId, card) => {
      if (socketId != scene.socket.id) {
        return
      } else {
        let cardName = card[0];
        //pickupObject has index of hand.length
        let l = scene.GameHandler.playerHand.length;
        scene.pickupObject = scene.DeckHandler.dealCard(700, 500, cardName, card[1], card[2], card[3], card[4], -1, 'playerCard', 0.26);
        if ((card[3] == '7') || (card[3] == '8')) {
          scene.GameHandler.viewOwnCards.forEach((button) => button.setVisible(true));
        }
      }
    })

    scene.socket.on('renderDiscard', (socketId, discard) => {
      if (socketId != scene.socket.id) {
        //discard cards have index of -1
        scene.topDiscard = scene.GameHandler.discard.push(scene.DeckHandler.dealCard(470, 500, discard[0], discard[1], discard[2], discard[3], discard[4], -1, 'playerCard', 0.26));
      } else {
        scene.GameHandler.discard.push([discard[0], discard[1], discard[2], discard[3], discard[4]])
      }
    })


    scene.socket.on('cardMatched', (socketId, playerHand, card, index) => {
      if (socketId == scene.socket.id) {
        //update playerHand
        scene.GameHandler.playerHand[index].data.values['index'] = -1;
        scene.topdiscard = scene.GameHandler.discard.push(scene.GameHandler.playerHand[index]);
        scene.GameHandler.playerHand[index] = [];
        console.log(scene.GameHandler.playerHand);
      } else {
        scene.topDiscard = scene.GameHandler.discard.push(scene.DeckHandler.dealCard(470, 500, card['sprite'], card['suit'], card['face'], card['value'], card['power'], -1, 'playerCard', 0.26));
        scene.GameHandler.player2Hand[index].destroy();
      }
    })
    scene.socket.on('secondMatch', (socketId, card) => {
      if (socketId == scene.socket.id) {
        console.log("second match, return to hand");
        scene.secondMatchText.setVisible(true);
        let index = Number(scene.GameHandler.lastDiscarded.data.values['index']);
        scene.GameHandler.lastDiscarded.x = (155 + (index * 155));
        scene.GameHandler.lastDiscarded.y = 860;
        scene.GameHandler.lastDiscarded = [];
      }
    })

    scene.socket.on('dealToHand', (socketId, card) => {
      if (socketId == scene.socket.id) {
        console.log("not match, dealing to hand");
        let l = scene.GameHandler.playerHand.length;
        scene.handZones.push(scene.dropZone = this.zoneHandler.renderZone((155 + (155 * l)), 860, 130, 189));
        this.zoneHandler.renderOutline(scene.dropZone, 5);

        scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(155 + (l * 155), 860, card[0], card[1], card[2], card[3], card[4], l, 'playerCard', 0.26))
        scene.GameHandler.viewOwnCards.push(scene.add.text(108 + (l * 155), 720, 'View Card', { fill: '#0f0' }).setData({ "type": "viewOwnCard", "index": i }).setInteractive().setVisible(false).setFontSize(20));

        //return original card to hand
        let index = Number(scene.GameHandler.lastDiscarded.data.values['index']);
        scene.GameHandler.lastDiscarded.x = (155 + (index * 155));
        scene.GameHandler.lastDiscarded.y = 860;
        scene.GameHandler.lastDiscarded = [];

      } else {
        let l = scene.GameHandler.player2Hand.length;
        scene.GameHandler.player2Hand.push(scene.DeckHandler.dealBackCard(155 + (l * 155), 135, l, 0.26));
      }
    })

    scene.socket.on('viewOwnCard', (socketId, card) => {
      if (socketId != scene.socket.id) {
        return
      } else {
        let temporary = scene.DeckHandler.dealCard(155, 500, card[0], card[1], card[2], card[3], card[4], -2, 'playerCard', 0.4)
        setTimeout(() => {
          temporary.destroy();
        }, 3000);
      }
    })

  }
}