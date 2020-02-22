import { MenuButton } from '../ui/menu-button'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'MainMenu'
}

/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class MainMenuScene extends Phaser.Scene {
  public constructor() {
    super(sceneConfig)
  }

  public create(): void {
    this.add
      .text(
        100,
        50,
        'This is a sample main menu. Click the "Start" button below to run your game.',
        { fill: '#FFFFFF' }
      )
      .setFontSize(24)

    new MenuButton(this, 100, 150, 'Snake', () => {
      this.scene.start('Snake')
    })

    new MenuButton(this, 100, 250, '-- Other game --', () => console.log('--'))

    new MenuButton(this, 100, 350, '-- Other game --', () => console.log('--'))
  }
}
