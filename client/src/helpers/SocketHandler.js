import io from 'socket.io-client';

export default class SocketHandler {

  constructor(scene) {

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
        scene.DeckHandler.dealCard(1000, 860, 'cardBack', 'playerCard');
        scene.DeckHandler.dealCard(1000, 135, 'cardBack', 'player2Card');
        scene.dealCards.setInteractive();
        scene.dealCards.setColor('#00ffff');
      }
      if (gameState == 'Dealing') {
        //onscreen text 'Dealing'
      }
    })

    //when recieves the dealCards message
    scene.socket.on('dealCards', (socketId, cards) => {
      //if client socketid do this
      if (socketId == scene.socket.id) {
        for (let i in cards) {
          //so card positions are not ontop of each other
          let card = scene.GameHandler.playerHand.push(scene.deckHandler.dealCard(155 + (i * 155), 860, cards[i], 'playerCard'));
        }
      } else {
        for (let i in cards) {
          let card = scene.GameHandler.player2Hand.push(scene.DeckHandler.dealCard(155 + (i * 155), 135, 'cardBack', 'player2Card'));
        }
      }
    })

    scene.socket.on('dealingCards', (socketId, hand) => {
      if (socketId == scene.socket.id) {
        console.log(hand);
        for (let i in hand) {
          let cardName = hand[i][0];
          let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(155 + (i * 155), 860, cardName, 'playerCard'));
        }
      }
      else {
        for (let i in hand) {
          let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(155 + (i * 155), 135, 'cardBack', 'player2Card'));
        }
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