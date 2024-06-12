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
        console.log(hand);
        for (let i in hand) {
          let cardName = hand[i][0];
          scene.dropZone = this.zoneHandler.renderZone((155 + (155 * i)), 860, 130, 189);
          this.zoneHandler.renderOutline(scene.dropZone);
          let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(155 + (i * 155), 860, cardName, 'playerCard', 0.26));
          //let dropZoneName = "cardZone" + toString(i);

        }
        //render card back for deck area
        let deckCard = scene.DeckHandler.dealCard(1000, 500, 'cardBack', 'playerCard', 0.33);
        scene.input.setDraggable(deckCard, false);
      }
      else {
        for (let i in hand) {
          let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(155 + (i * 155), 135, 'cardBack', 'player2Card', 0.26));
        }
      }
    })

    scene.socket.on('pickupCard', (socketId, card) => {
      if (socketId != scene.socket.id) {
        return
      } else {
        let cardName = card[0];
        scene.pickupObject = scene.DeckHandler.dealCard(700, 500, cardName, 'playerCard', 0.26);

      }
    })

    scene.socket.on('cardPlayed', (cardName, socketId) => {
      //the other clients move
      if (socketId != scene.socket.id) {
        scene.GameHandler.player2Hand.shift().destroy();
        scene.DeckHandler.dealCard(scene.dropZone.x, scene.dropZone.y, 'player2Card');
      }
    })

  }
}