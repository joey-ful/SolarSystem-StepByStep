export default class Planet {
  constructor(star, radius, color, velocity, orbitRadius) {
    this.star = star;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.orbitRadius = orbitRadius;

    this.velocity_backup = velocity;
    this.theta = Math.random() * Math.PI * 2;
    this.startX = this.star.x;
    this.startY = this.star.y;
    this.clicked = false;
  }

  update(ctx) {
    this.theta += this.velocity;

    if (!this.clicked) {
      this.startX = this.star.x;
      this.startY = this.star.y;
    }

    this.interaction();

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

  interaction() {
    this.canvas = document.getElementById('canvas');

    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.restore);
    this.canvas.addEventListener('mouseout', this.restore);
  }

  onMouseDown = (e) => {
    this.offsetX = e.clientX - this.x;
    this.offsetY = e.clientY - this.y;

    if (
      Math.abs(this.offsetX) <= this.radius &&
      Math.abs(this.offsetY) <= this.radius
    ) {
      this.clicked = true;
      this.canvas.addEventListener('mousemove', this.onMouseMove);
    }
  };

  onMouseMove = (e) => {
    this.startX = e.clientX - this.offsetX;
    this.startY = e.clientY - this.offsetY;

    this.velocity = 0;
    this.orbitRadius = 0;
    this.theta = 0;
  };

  restore = () => {
    if (this.clicked) {
      this.clicked = false;
      this.startX = this.star.x;
      this.startY = this.star.y;
      this.velocity = this.velocity_backup;
      this.orbitRadius = Math.sqrt(
        Math.pow(this.startX - this.x, 2) + Math.pow(this.startY - this.y, 2)
      );
      this.theta = Math.acos((this.x - this.startX) / this.orbitRadius);

      if (this.y - this.startY < 0) {
        this.theta = 2 * Math.PI - this.theta;
      }
    }

    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
  };
}
