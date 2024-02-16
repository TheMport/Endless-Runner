//Purpose: Run the main game loop

class Play extends Phaser.Scene {
    constructor() {
        super('Play')
        this.speedIncreaseTime = 1000 // Time increase speed
        this.speedIncrement = 20 // Speed increase amount
        this.lastSpeedIncrease = 0 // Last time the speed was increased
    }

    preload() {
        //?????
    }

    create() {
        // Initialize background only once here
        this.backgrounds = ['B1','B2', 'B3', 'B4', 'B5', 'B6', 'B7']
        this.currentBackgroundIndex = 0
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, this.backgrounds[this.currentBackgroundIndex]).setOrigin(0, 0)
        this.background.setScrollFactor(0) //the background scrolls with the camera

        // Player physics
        this.player = this.physics.add.sprite(0,500, 'UserRunSheet')
        this.player.setBounce(0.0)
        this.physics.world.enable(this.player)
        this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, this.sys.game.config.height)
        // Create a static physics group for the floor
        const floor = this.physics.add.staticGroup()
        floor.create(this.sys.game.config.width / 2, this.sys.game.config.height - 10, 'floorTexture').setScale(2).refreshBody()

        // Enable collision between the player and the floor
        this.physics.add.collider(this.player, floor)
        //this.physics.world.setBounds(0,0,250,100)
        this.player.body.setCollideWorldBounds(true)
        this.player.setGravityY(425)

        // Automatically start the player running
        this.player.setVelocityX(200)

        // Player Jump
        this.playerJump()

        // Player sprite animations
        this.initPlayerAnimations() // Use the refactored method to initialize player animations
        this.player.play('run')

        // Camera follow player
        this.cameras.main.startFollow(this.player, true)
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, this.sys.game.config.height)

        // Create platforms and obstructions
        this.platformManager = new Platforms(this)
        this.obstructionManager = new Obstructions(this)

        // Collide the player with platforms and obstructions
        this.physics.add.collider(this.player, this.platformManager.Platforms)
        this.physics.add.collider(this.player, this.obstructionManager.Obstructions, this.hitObstacle, null, this)

        this.scoreText = this.add.text(this.sys.game.config.width / 2, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#FFF'
        }).setOrigin(0.5, 0).setScrollFactor(0)

        //Music & Sound Effects
        this.backgroundMusic = this.sound.add('dsWooo', { loop: true, volume: 0.5 });
        this.backgroundMusic.play()

        //DUBuBING 
        //let graphics = this.add.graphics().setScrollFactor(0);
        //graphics.lineStyle(2, 0xffff00, 1);
        //graphics.strokeRect(0, 0, Number.MAX_SAFE_INTEGER, this.sys.game.config.height);
    }

    update(time, delta) {

        // Increase player speed over time
        if (time - this.lastSpeedIncrease > this.speedIncreaseTime) {
            this.player.setVelocityX(this.player.body.velocity.x + this.speedIncrement)
            this.lastSpeedIncrease = time
        }


        // Update score over time 
        this.score += delta / 1000 // Add 1 point per second
        this.scoreText.setText('Score: ' + Math.floor(this.score)) // Update score display
        
        //Music & Sound Effects

        // Update background scrolling in the existing tileSprite instead of creating a new one
        this.background.tilePositionX += this.player.body.deltaX() * 0.5

        //this.physics.world.createDebugGraphic()
        this.handleBackgroundScrolling()

        this.platformManager.update()
        this.obstructionManager.update()

        if (this.player.x < 0) this.player.x = 0 // Prevent going left past the worlds start
        if (this.player.y < 0) this.player.y = 0 // Prevent going above the world's top
        if (this.player.y > this.sys.game.config.height) this.player.y = this.sys.game.config.height // Prevent falling below the floor
    }

    handleBackgroundScrolling() {
        // This method can be simplified or adjusted as needed
        if (this.player.x >= 1 * (this.currentBackgroundIndex + 1)) {
            this.updateBackground()
        }
    }
    
    updateBackground() {
        if (this.player.x > this.backgrounds.length * 500) {
            this.currentBackgroundIndex = (this.currentBackgroundIndex + 1) % this.backgrounds.length;
            this.background.setTexture(this.backgrounds[this.currentBackgroundIndex])
        }
    }
    
    playerJump() {
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.player.body.blocked.down || this.player.body.touching.down) {
                const currentVelocityX = this.player.body.velocity.x
                this.player.setVelocityY(-300)
                this.player.setVelocityX(currentVelocityX)
                this.increaseScore(5) // +points
            }
        })
    }

    increaseScore(amount) {
        this.score += amount;
        this.scoreText.setText('Score: ' + Math.floor(this.score)) // Update score display
    }
    
    initPlayerAnimations() {
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('UserRunSheet', { frames: [0, 1, 2, 3, 4, 5] }),
            frameRate: 16,
            repeat: -1
        })
    }

    hitObstacle(player, obstacle) {
        // Game over logic
        this.physics.pause()
        player.setTint(0xff0000)
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Over', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5)
        this.restartGame()
    }
    

    restartGame() {
        this.input.keyboard.once('keydown-R', () => this.scene.restart())
    }
}
