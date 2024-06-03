import CardHandler from '../helpers/CardHandler';
import DeckHandler from '../helpers/DeckHandler';
import InteractiveHandler from '../helpers/InteractiveHandler';
import GameHandler from '../helpers/GameHandler';
import SocketHandler from '../helpers/SocketHandler';
import UIHandler from '../helpers/UIHandler';
//import { loadFromDirectory } from '../helpers/JunkFunctions';

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
        this.load.image('testCard', '2_of_clubs.png');

        //communicate wif server and run the loadfromDirectory Function
    }

    //constant tick updates for detection
    update() {

    }
}
