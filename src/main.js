import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import GameScene from './scenes/GameScene'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 450,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			fps: 60
		}
	},
	scene: [GameScene, HelloWorldScene]
}

export default new Phaser.Game(config)
