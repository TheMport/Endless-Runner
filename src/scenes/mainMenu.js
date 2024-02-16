// Purpose: Main menu scene for the game (this is what the player is met with as soon as he loads into the game after seeing 
// the loading bar
class mainMenu extends Phaser.Scene {
    constructor() { 
        super('mainMenu')
    }

    create() { 

        //Add the main menu backround title and instructions
        this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'B1').setDepth(1)
        this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'title').setOrigin(0.5,0.75).setDepth(2)
        this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'controlInstructions').setOrigin(0.5,0.5).setDepth(2)

        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)



    }

    update() {
        
        //Space -> Play
        if (this.keySpace.isDown) {
            this.scene.start('Play')
        }

    }

}