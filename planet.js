export default class Planet {
  constructor(name, star, radius, color, velocity, orbitRadius) {
    this.name = name;
    this.star = star;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.orbitRadius = orbitRadius;

    this.theta = Math.random() * Math.PI * 2;
  }

  update(ctx) {
    this.theta += this.velocity;

    this.startX = this.star.x;
    this.startY = this.star.y;

    this.x = this.startX + this.orbitRadius * Math.cos(this.theta);
    this.y = this.startY + this.orbitRadius * Math.sin(this.theta);

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}