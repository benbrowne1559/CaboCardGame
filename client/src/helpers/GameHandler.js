export default class GameHandler {

  constructor(scene) {
    this.gameState = "Initializing";
    this.isMyTurn = false;
    this.playerHand = [];
    this.player2Hand = [];
    this.canPickup = false;
    this.swappedCard = false;
    this.discard = [];
    this.lastDiscarded = [];
    this.lastMatch = -1;
    this.viewOwnCards = [];
    this.viewOpponentCards = [];
    this.oppZones = [];


    this.changeTurn = () => {
      scene.notTurnText.setVisible(false);
      this.isMyTurn = !this.isMyTurn;
      this.canPickup = true;
      console.log("isMyTurn: " + this.isMyTurn);
      if (this.gameState != "Initializing") {
        if (this.getTurn() == true) {
          scene.caboText.setVisible(true);
        }
      }

    }


    this.truePickup = () => {
      this.canPickup = true;
    }

    this.changeGameState = (gameState) => {
      this.gameState = gameState;
      console.log("GameState: " + this.gameState);
    }

    this.getTurn = () => {
      return this.isMyTurn;
    }
    this.getPickup = () => {
      return this.canPickup;
    }

  }

}