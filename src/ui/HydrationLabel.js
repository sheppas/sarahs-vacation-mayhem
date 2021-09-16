import Phaser from 'phaser'

const formatHydration = (score) => `Hydrated: ${score}`

export default class HydrationLabel extends Phaser.GameObjects.Text
{
	constructor(scene, x, y, score, style)
	{
		super(scene, x, y, formatHydration(score), style)
		this.score = score
	}

	setScore(score)
	{
		this.score  = score
		this.updateScoreText()
	}

	add(points)
	{
		this.setScore(this.score + points)
	}

	updateScoreText()
	{
		this.setText(formatHydration(this.score))
	}
}
