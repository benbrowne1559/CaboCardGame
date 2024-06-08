import CardHandler from '../helpers/CardHandler';
import DeckHandler from '../helpers/DeckHandler';
import InteractiveHandler from '../helpers/InteractiveHandler';
import GameHandler from '../helpers/GameHandler';
import SocketHandler from '../helpers/SocketHandler';
import UIHandler from '../helpers/UIHandler';

const card_names = require('./image_names.json');

import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {

        this.CardHandler = new CardHandler();
        this.DeckHandler = new DeckHandler(this);
        this.GameHandler = new GameHandler(this);
        this.SocketHandler = new SocketHandler(this);
        this.UIHandler = new UIHandler(this);
        this.UIHandler.buildUI();
        this.InteractiveHandler = new InteractiveHandler(this);
    }

    preload() {

        this.load.setPath('assets');
        this.load.image('cardBack', 'card_back.png');

        card_names.forEach((card_image) => {
            let card = card_image.split(".")[0];
            let card_split = card.split("_");
            let name = card_split[0] + card_split[2];
            this.load.image(name, card_image);
        })
    }

    //constant tick updates for detection
    update() {

    }
}
