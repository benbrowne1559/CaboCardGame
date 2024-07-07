//import { Boot } from './scenes/Boot';
import Phaser from 'phaser';
import { Game } from './scenes/Game';
//import { GameOver } from './scenes/GameOver';
//import { MainMenu } from './scenes/MainMenu';
//import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

//npm run dev
const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 1000,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Game,
    ]
};

export default new Phaser.Game(config);
