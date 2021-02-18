export default class Planet {
  constructor(name, star, radius, color, velocity, orbitRadius) {
    this.name = name;
    this.star = star;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.orbitRadius = orbitRadius;

    this.theta = Math.random() * Math.PI * 2;
    this.clicked = false;
  }

  update(ctx) {
    this.interaction();
    this.theta += this.velocity;

    if (!this.clicked) {
      this.startX = this.star.x;
      this.startY = this.star.y;
    }

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

    this.orbitRadius = 0;
  };

  restore = () => {
    if (this.clicked && this.name !== 'sun') {
      this.clicked = false;
      this.startX = this.star.x;
      this.startY = this.star.y;
      this.orbitRadius = Math.sqrt(
        Math.pow(this.startX - this.x, 2) + Math.pow(this.startY - this.y, 2)
      );
      this.theta = Math.acos((this.x - this.startX) / this.orbitRadius);

      if (this.y - this.startY < 0) {
        this.theta = 2 * Math.PI - this.theta;
      }
    } else if (this.clicked && this.name === 'sun') {
      this.clicked = false;
      this.star.x = this.startX;
      this.star.y = this.startY;
    }
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
  };
}