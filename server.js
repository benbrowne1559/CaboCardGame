const Deck = require('./server_functions.js');




const server = require('express')();
const http = require('http').createServer(server);


let players = {};
let readyCheck = 0;
let gameState = "Initializing"
var deck = []

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
    isFirstPlayer: false,
    beenDealt: false
  }

  if (Object.keys(players).length < 2) {
    players[socket.id].isFirstPlayer = true;
    //changes clients isTurn to True
    io.emit('firstTurn');
  }

  if (Object.keys(players).length >= 2) {

    gameState = "Dealing";
    io.emit('changeGameState', 'Dealing');
    deck = new Deck();
    for (const socketId in players) {
      if (players[socketId]['beenDealt'] != true) {
        hand = deck.createHand();
        players[socketId]['playerHand'] = hand;
        console.log(socketId, players[socketId]['playerHand'], players[socketId]['isFirstPlayer']);
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
      io.emit('pickupCard', socketId, card);
    }
  })

  socket.on('cardDiscarded', function (card, socketId) {
    if (deck.discard.length != 0) {
      lastDiscard = deck.discard[deck.discard.length - 1];
      deck.discard.push(card);
      console.log(deck.discard);
    }
    else {
      deck.discard.push(card);
      console.log(deck.discard);
      io.emit("turnOver", socketId)
    }

  })

})

http.listen(3000, function () {
  console.log("server started");
})
