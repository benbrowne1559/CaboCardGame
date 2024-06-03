import CardBack from "./cards/CardBack";
import NormalCard from "./cards/NormalCard";

export default class DeckHandler {

  constructor() {
    this.dealCard = (x, y, name, type) => {
      let cards = {
        cardBack: new CardBack(scene),
        normal: new NormalCard(scene)
      }
      let newCard = cards[name];
      return (newCard.render(x, y, type));
    }

  }
}