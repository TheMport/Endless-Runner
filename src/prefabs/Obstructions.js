//Purpose: stores and operates how the obstructions will be loaded and used into the game using images in assets
//User will have to avoid these obstructions to continue playing the game

class Obstructions extends Phaser.GameObjects.Sprite {
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.Obstructions = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false
        })
        this.spawnInitialObstructions();
    }
    //spawn initial obstructions when the game starts
    spawnInitialObstructions(){
        const groundLevel = this.scene.sys.game.config.height-10000
        this.createObstruction(this.scene.sys.game.config.width/2, groundLevel, 'Ob')
    }

    createObstruction(x,y,type){
        const obstruction = this.Obstructions.create(x,y,type)
        obstruction.body.setSize(obstruction.width,obstruction.height,true).setOffset(0,0)
        return obstruction
    }

    update(){
        this.spawnNewObstructions();
        // Remove off screen obstructions
        this.Obstructions.getChildren().forEach(obstruction => {
            if(obstruction.x + obstruction.width < this.scene.cameras.main.scrollX) {
                obstruction.destroy();
            }
        })
    }

    spawnNewObstructions(){
        let furthestObstructionX = 0
        this.Obstructions.getChildren().forEach(function(obstruction){
            furthestObstructionX = Math.max(furthestObstructionX,obstruction.x) 
    })

    if (furthestObstructionX < this.scene.cameras.main.worldView.right +200){
        const newObstructionType = this.selectRandomObstructionType();
        const newObstructionX = furthestObstructionX + Phaser.Math.Between(100,300)
        const newObstructionY = Phaser.Math.Between(this.scene.sys.game.config.height/2,this.scene.sys.game.config.height-50)

        this.createObstruction(newObstructionX,newObstructionY,newObstructionType)
    }
        if(furthestObstructionX < this.scene.sys.game.config.width-500){
            const newObstructionType = this.selectRandomObstructionType()
            const newObstructionX = furthestObstructionX + Phaser.Math.Between(100,500)
            const newObstructionY = Phaser.Math.Between(this.scene.sys.game.config.height/2,this.scene.sys.game.config.height-50)

            this.createObstruction(newObstructionX,newObstructionY,newObstructionType)

        }
    }

    selectRandomObstructionType(){
        const types = ['Ob']
        const index = Phaser.Math.Between(0,types.length-1)
        return types[index]
    }
} 
