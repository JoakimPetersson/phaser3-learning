import { Input, Scene } from 'phaser'
import { getGameWidth, getGameHeight } from '../../helpers'
import { Snake, Direction } from './snake'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Snake'
}

export class SnakeScene extends Phaser.Scene {
  public speed: number = 200

  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys
  private image: Phaser.Physics.Arcade.Sprite
  private snake: Snake

  public constructor() {
    super(sceneConfig)
  }

  public create(): void {
    // Add a player sprite that can be moved around. Place him in the middle of the screen.
    this.snake = new Snake()
    this.snake.initialize(this, 8, 8)

    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = this.input.keyboard.createCursorKeys()
  }

  public update(): void {
    if (this.cursorKeys.up.isDown) {
      this.snake.changeDirection(Direction.UP)
    } else if (this.cursorKeys.down.isDown) {
      this.snake.changeDirection(Direction.DOWN)
    } else if (this.cursorKeys.left.isDown) {
      this.snake.changeDirection(Direction.LEFT)
    } else if (this.cursorKeys.right.isDown) {
      this.snake.changeDirection(Direction.RIGHT)
    }

    this.snake.update(this.time.now)
  }
}
