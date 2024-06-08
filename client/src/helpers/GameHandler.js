export default class GameHandler {

  constructor(scene) {
    this.gameState = "Initializing";
    this.isMyTurn = false;
    this.playerHand = [];
    this.player2Hand = [];
    this.canPickup = true;

    this.changeTurn = () => {
      this.isMyTurn = !this.isMyTurn;
      console.log("isMyTurn: " + this.isMyTurn);
    }

    this.changeGameState = (gameState) => {
      this.gameState = gameState;
      console.log("GameState: " + this.gameState);
    }


  }
}