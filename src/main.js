// Name: Miguel Comonfort 
// Date: February 14, 2024
//Game: attack on cyan
//Purpose: game config file

// keep me honest
'use strict'

// define and configure main Phaser game object
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Load, mainMenu, Play, gameOver]
}


// define game
let game = new Phaser.Game(config)

// define globals

let keySpace,keyReset