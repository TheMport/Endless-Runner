//Purpose: stores and operates where and how the platforms will be loaded into the game using images in assets
// User will be able to jump on these platforms to avoid obstacles

class Platforms extends Phaser.GameObjects.Sprite {
    constructor(scene){
        super(scene)
        this.scene = scene;
        this.Platforms = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false
        })
        //spawn logic for platforms
        this.spawnInitialPlatforms()
    }
    //spawn initial platforms when the game starts 
    spawnInitialPlatforms(){
        const groundLevel = this.scene.sys.game.config.height-10000
        this.createPlatform(this.scene.sys.game.config.width/2, groundLevel, 'pLarge')
    }

    createPlatform(x,y,type){
        const platform = this.Platforms.create(x,y,type)
        platform.body.setSize(platform.width,platform.height,true).setOffset(0,0)
        return platform
    }

    update(){
    this.spawnNewPlatforms()
    // Correct platform removal by directly iterating over the active platforms
    this.Platforms.getChildren().forEach(platform => {
        if (platform.x + platform.width < this.scene.cameras.main.scrollX) {
            platform.destroy() // Use destroy() to remove the platform and its physics body
        }
    })
    }

    //This determines when and where throughout the game the platforms will spawn in
    spawnNewPlatforms() {
        let furthestPlatformX = 0
        this.Platforms.getChildren().forEach(platform => {
            furthestPlatformX = Math.max(furthestPlatformX, platform.x)
        });
    
        // Only one condition needed to check if a new platform needs to be spawned
        if (furthestPlatformX < this.scene.cameras.main.worldView.right + 200) { // Adjust the offset as needed
            const newPlatformType = this.selectRandomPlatformType()
            const newPlatformX = furthestPlatformX + Phaser.Math.Between(100, 250)
            const newPlatformY = Phaser.Math.Between(this.scene.sys.game.config.height / 2, this.scene.sys.game.config.height - 50)
    
            this.createPlatform(newPlatformX, newPlatformY, newPlatformType)
        }
    
    

    if (furthestPlatformX < this.scene.sys.game.config.width -250){
        //picks a random platform type to spawn in from the group of three 
        const newPlatformType = this.selectRandomPlatformType()
        const newPlatformX = furthestPlatformX + Phaser.Math.Between(100,500)
        //line below ensures that the platforms that are created are reachable by the player
        const newPlatformY = Phaser.Math.Between(this.scene.sys.game.config.height/1.1,this.scene.sys.game.config.height-20)

        this.createPlatform(newPlatformX,newPlatformY,newPlatformType)
        
    }}

    //cycles through the platforms in assets and selects a random one to spawn in
    selectRandomPlatformType(){
        const types = ['pLarge','pMedium','pSmall']
        const index = Phaser.Math.Between(0,types.length-1)
        return types[index]
    }




}