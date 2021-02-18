export default class Background {
  constructor(starNumber, ctx, stageWidth, stageHeight) {
    this.starNumber = starNumber;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.colorBackground(ctx);
    this.fillStars(ctx);
  }

  colorBackground(ctx) {
    let gradient = ctx.createRadialGradient(
      this.stageWidth / 2,
      this.stageHeight / 2,
      this.stageWidth / 3,
      this.stageWidth / 2,
      this.stageHeight / 2,
      this.stageWidth / 1.5
    );

    gradient.addColorStop(0, '#214568');
    gradient.addColorStop(1, '#162133');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
  }

  fillStars(ctx) {
    for (let i = 0; i < this.starNumber; i++) {
      let radius = Math.random() * 1 + 0.1;
      let x = radius + Math.random() * (this.stageWidth - radius * 2);
      let y = radius + Math.random() * (this.stageHeight - radius * 2);

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'white';
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.closePath();
    }
  }
}