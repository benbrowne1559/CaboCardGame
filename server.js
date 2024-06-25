//nodemon server.js

const Deck = require('./server_functions.js');


const server = require('express')();
const http = require('http').createServer(server);


let players = {};
let readyCheck = 0;
let gameState = "Initializing"
var deck = []
let lastMatch = -1;

let allowNewConnection = true;


//receives requests from port 8080
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
});

//when a client connects
io.on('connection', function (socket) {
  console.log("User connected: " + socket.id);

  players[socket.id] = {
    playerHand: [],
    isTurn: false,
    beenDealt: false
  }

  if (Object.keys(players).length > 2) {
    players = {};
    console.log("sending out resets");
    io.emit('reset');
  }

  if (Object.keys(players).length == 1) {
    players[socket.id].isTurn = true;
    //changes clients isTurn to True
    io.emit('changeTurn');
  }

  if (Object.keys(players).length == 2) {

    gameState = "Dealing";
    io.emit('changeGameState', 'Dealing');
    deck = new Deck();
    for (const socketId in players) {
      if (players[socketId]['beenDealt'] != true) {
        hand = deck.createHand();
        players[socketId]['playerHand'] = hand;
        console.log(socketId, players[socketId]['playerHand'], players[socketId]['isTurn']);
        players[socketId]['beenDealt'] = true;
        io.emit('dealingCards', socketId, hand);
      }
    }
  }

  socket.on('pickupCard', function (socketId) {
    if (deck.deck.length == 0) {
      console.log("deck empty");
      io.emit('emptyDeck', socketId);
    } else {
      let card = deck.deck.pop();
      console.log(card[0] + " picked up by " + socketId);
      io.emit('pickupCard', socketId, card);
    }
  })
  socket.on('swappedHand', function (socketId, newCard, index) {
    //replaces hand[index] with newCard and adds hand[index] to the discard pile
    let card = deck.convertCard(newCard);
    let discard = players[socketId]['playerHand'][index];
    players[socketId]['playerHand'][index] = card;
    deck.discard.push(discard);
    console.log(discard[0] + " added to discard by " + socketId);
    io.emit('renderDiscard', socketId, discard);
    io.emit('changeTurn');
  })
  socket.on('swappedHandDiscard', function (socketId, newCard, index) {
    //replaces hand[index] with newCard and removes newCard from discard and adds hand[index] to discard
    let card = deck.convertCard(newCard);
    let discard = players[socketId]['playerHand'][index];
    players[socketId]['playerHand'][index] = card;
    let rm = deck.discard.pop();
    console.log(rm[0] + " removed from discard by " + socketId);
    deck.discard.push(discard);
    console.log(discard[0] + " added to discard by " + socketId);
    io.emit('renderDiscard', socketId, discard);
    io.emit('changeTurn');

  })

  socket.on('straightDiscard', function (socketId, discardCard) {
    let discard = [discardCard['sprite'], discardCard['suit'], discardCard['face'], discardCard['value'], discardCard['power']];
    deck.discard.push(discard);
    lastMatch = -1;
    console.log(discardCard['sprite'] + " added to discard by " + socketId);
    io.emit('renderDiscard', socketId, discard);
    io.emit('changeTurn');
  })

  socket.on('checkMatch', function (socketId, card, xcoord) {
    let cardFace = card["face"];
    let discardFace = deck.discard[deck.discard.length - 1][2];
    if (discardFace == cardFace) {
      if (cardFace == lastMatch) {
        io.emit('secondMatch', socketId, card);
        return
      }
      lastMatch = card['face'];
      const index = card['index'];
      players[socketId]['playerHand'][index] = [];
      deck.discard.push(deck.convertCard(card));
      io.emit('cardMatched', socketId, players[socketId]['playerHand'], card, index);

    } else {
      console.log("no match");
      let card = deck.deck.pop();
      io.emit('dealToHand', socketId, card);
    }
  })

  socket.on('viewOwnCard', function (socketId, index) {
    let card = players[socketId]['playerHand'][index];
    io.emit('viewOwnCard', socketId, card);
  })

})



http.listen(3000, function () {
  console.log("server started");
})
