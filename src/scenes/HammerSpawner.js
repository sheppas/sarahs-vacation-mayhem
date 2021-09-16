import Phaser from "phaser";

export default class HammerSpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, hammerKey = "hammer") {
    this.scene = scene;
    this.key = hammerKey;

    this._group = this.scene.physics.add.group();
  }

  get group() {
    return this._group;
  }

  spawn() {
    let spawnLocation = true;
    let x;
    if (spawnLocation) {
      x = 30;
      !spawnLocation;
    } else {
      x = 760;
      !spawnLocation;
    }
    const hammer = this.group.create(x, 16, this.key);
    hammer.setBounce(1);
    hammer.setCollideWorldBounds(true);
    hammer.setVelocity(Phaser.Math.Between(-200, 200), 20);

    return hammer;
  }
}
