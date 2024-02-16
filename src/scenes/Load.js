//Purpose: dedicated for loading in sprites,backrounds, and mainMenu

class Load extends Phaser.Scene {
    constructor() { 
        super('Load')
    }

    preload(){ 

        //loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })
        

        this.load.on('progress', (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
        })

        //mainMenu title,controls, and backround
        this.load.image('title', 'assets/titleScreenTxt.png')
        this.load.image('controlInstructions', 'assets/controlInstructions.png')
        
        //these backrounds will be changed as the player progresses through the game and reaches a higher level in the game
        this.load.image('B1', 'assets/backColor1.png')
        this.load.image('B2', 'assets/backColor2.png')
        this.load.image('B3', 'assets/backColor3.png')
        this.load.image('B4', 'assets/backColor4.png')
        this.load.image('B5', 'assets/backColor5.png')
        this.load.image('B6', 'assets/backColor6.png')
        this.load.image('B7', 'assets/backColor7.png')

        //music and sound effects
        this.load.audio('dsWooo', 'assets/Darude - Sandstorm.mp3')

        //these images will be the "Player" sprites (NEED TO ADD JUMP SPRITE ASAP) 
        this.load.spritesheet('UserRunSheet', 'assets/ballRun.png',{
            frameWidth:32,
            frameWidth:32
        })

        //Platforms
        this.load.image('pLarge','assets/platformLarge.png')
        this.load.image('pMedium','assets/platformMedium.png')
        this.load.image('pSmall','assets/platformSmall.png')

        //Obstructions
        this.load.image('Ob', 'assets/Obstruction.png')

    }

    create() { 
        this.scene.start('mainMenu')
        
    }


}