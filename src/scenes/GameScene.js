import Phaser from "phaser";

import HydrationLabel from "../ui/HydrationLabel";
import HammerSpawner from "./HammerSpawner";

const LOG_KEY = "log";
const SARAH_KEY = "sarah";
const HAMMER_KEY = "hammer";
const BOTTLE_KEY = "bottle";



export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");

    this.player = undefined;
    this.cursors = undefined;
    this.hydration = undefined;
    this.hammerSpawner = undefined;
    this.gameOver = false;
  }

  preload() {
    this.load.image(
      "background",
      "assets/8-bit-houses-trees-mountains-sun-4k-yb.jpeg"
    );
    this.load.image(LOG_KEY, "assets/log2.png");
    this.load.image(HAMMER_KEY, "assets/hammer.png");
    this.load.image(BOTTLE_KEY, "assets/waterbottle.png");

    this.load.spritesheet(SARAH_KEY, "assets/mini-sarah.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 225, "background");

    const platforms = this.createPlatforms();
    this.player = this.createPlayer();
    const bottle = this.createBottle();

    this.hydration = this.createHydrationLabel(25, 25, "NO!")

    this.hammerSpawner = new HammerSpawner(this, HAMMER_KEY)
    const hammerGroup = this.hammerSpawner.group

    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(bottle, platforms)
    this.physics.add.collider(hammerGroup, platforms)
    this.physics.add.collider(this.player, hammerGroup, this.hitHammer, null, this)

    this.physics.add.overlap(this.player, bottle, this.collectBottle, null, this)

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    let time = Math.floor(this.time.now)
    console.log(time)
    console.log(time % 173 === 0)
    if (time % 173 === 0){
      this.hammerSpawner.spawn()
    }


    if(this.gameOver) {
      return
    }
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-100)
      this.player.anims.play('left', true)
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(100)
      this.player.anims.play('right', true)
    }
    else {
      this.player.setVelocityX(0)
      this.player.anims.play('turn')
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-200)
    }


  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup();

    platforms.create(700, 100, LOG_KEY);
    platforms.create(350, 100, LOG_KEY);
    platforms.create(500, 150, LOG_KEY);
    platforms.create(200, 200, LOG_KEY);
    platforms.create(350, 250, LOG_KEY);
    platforms.create(600, 300, LOG_KEY);

    return platforms;
  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 400, SARAH_KEY);
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers(SARAH_KEY, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: SARAH_KEY, frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers(SARAH_KEY, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    return player;
  }

  createBottle(){
    const bottle = this.physics.add.group({
      key: BOTTLE_KEY,
      setXY: {x:700, y: 0}
    })

    bottle.children.iterate((child) => {child.setBounceY(0.2)
  })

  return bottle

  }

  collectBottle(player, bottle) {
    bottle.disableBody(true, true)
    this.hydration.setScore("YES!")
  }

  createHydrationLabel(x, y, score) {
    const style = {fontSize: '40px', fill: '#112'}
    const label = new HydrationLabel(this, x, y, score, style)

    this.add.existing(label)

    return label
  }

  hitHammer(player, hammer){
    this.physics.pause()
    player.setTint(0x245E12)
    player.anims.play('turn')
    this.hydration.setScore("Nope, you died!")
    this.gameOver = true
  }


}
