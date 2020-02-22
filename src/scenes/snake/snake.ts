import { Scene } from 'phaser'

export enum Direction {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3
}

export class Snake {
  private currentDirection: Direction
  private headPosition: Phaser.Geom.Point
  public body: Phaser.GameObjects.Group
  private head: Phaser.GameObjects.Group
  private alive: boolean = true
  private speed: number = 100
  private moveTime: number = 0
  private size: number = 16

  public initialize(scene: Phaser.Scene, x: number, y: number): void {
    // Init snake
    this.currentDirection = Direction.RIGHT
    this.headPosition = new Phaser.Geom.Point(x, y)
    this.body = scene.add.group()
    this.head = this.body.create(x * this.size, y * this.size, 'body')
    this.head.setOrigin(0)
  }

  public update(time: number): boolean {
    if (time >= this.moveTime) {
      console.log(this.currentDirection)

      return this.move(time)
    }
  }

  private move(time): boolean {
    // Move 1 square in the direction it is facing

    switch (this.currentDirection) {
      case Direction.UP:
        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30)
        break
      case Direction.DOWN:
        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30)
        break
      case Direction.LEFT:
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40)
        break
      case Direction.RIGHT:
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40)
        break

      default:
        break
    }

    // Update body segments
    Phaser.Actions.ShiftPosition(
      this.body.getChildren(),
      this.headPosition.x * this.size,
      this.headPosition.y * this.size,
      1
    )
    // Update the timer ready for the next movement
    this.moveTime = time + this.speed

    return true
  }

  public changeDirection(newDirection: Direction): void {
    switch (newDirection) {
      case Direction.UP:
        if (this.currentDirection !== Direction.DOWN) {
          this.currentDirection = newDirection
        }
        break
      case Direction.RIGHT:
        if (this.currentDirection !== Direction.LEFT) {
          this.currentDirection = newDirection
        }
        break
      case Direction.DOWN:
        if (this.currentDirection !== Direction.UP) {
          this.currentDirection = newDirection
        }
        break
      case Direction.LEFT:
        if (this.currentDirection !== Direction.RIGHT) {
          this.currentDirection = newDirection
        }
        break
      default:
        break
    }
  }
}
