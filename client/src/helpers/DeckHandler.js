import CardBack from "./cards/CardBack";
import NormalCard from "./cards/NormalCard";

export default class DeckHandler {

  constructor(scene) {
    //called for every card to be dealt
    //coords of render position, name of image, playerCard
    this.dealCard = (x, y, cardName, suit, face, value, power, index, type, scale) => {
      let cards = {
        cardBack: new CardBack(scene),
        normal: new NormalCard(scene, cardName, suit, face, value, power, index),
      }
      let newCard = cards['normal'];
      return (newCard.render(x, y, type, scale));
    }
    this.dealBackCard = (x, y, index, scale) => {
      let cards = {
        cardBack: new CardBack(scene, index),
      }
      let newCard = cards['cardBack'];
      return (newCard.render(x, y, 'cardBack', scale));
    }

  }
}