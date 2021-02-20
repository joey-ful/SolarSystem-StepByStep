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
    this.mouse = {
      x: star.x,
      y: star.y,
    };
  }

  update(ctx, shadowctx) {
    this.interaction();
    this.theta += this.velocity;

    if (this.clicked) {
      this.x = this.mouse.x;
      this.y = this.mouse.y;
    } else {
      this.x = this.star.x + this.orbitRadius * Math.cos(this.theta);
      this.y = this.star.y + this.orbitRadius * Math.sin(this.theta);
    }

    this.drawShadow(shadowctx);
    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  drawShadow(shadowctx) {
    if (this.name !== 'sun' && this.name !== 'moon') {
      this.toX = this.x + (this.radius + 30) * Math.cos(this.theta);
      this.toY = this.y + (this.radius + 30) * Math.sin(this.theta);

      shadowctx.beginPath();
      shadowctx.strokeStyle = 'rgba(33, 69, 104, 0.3)';
      shadowctx.lineWidth = this.radius * 2;
      shadowctx.moveTo(this.x, this.y);
      shadowctx.lineTo(this.toX, this.toY);
      shadowctx.lineWidth = this.radius * 2;
      shadowctx.stroke();
      shadowctx.closePath();
    }
  }

  interaction() {
    this.canvas = document.getElementById('shadowcanvas');

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
    this.mouse.x = e.clientX - this.offsetX;
    this.mouse.y = e.clientY - this.offsetY;

    if (this.name !== 'sun' && this.name !== 'moon') {
      
      this.orbitRadius = Math.sqrt(
        Math.pow(this.mouse.x - this.star.x, 2) +
          Math.pow(this.mouse.y - this.star.y, 2)
      );
      this.theta = Math.acos((this.mouse.x - this.star.x) / this.orbitRadius);

      if (this.mouse.y - this.star.y < 0) {
        this.theta = 2 * Math.PI - this.theta;
      }

      this.toX = this.mouse.x + (this.radius + 30) * Math.cos(this.theta);
      this.toY = this.mouse.y + (this.radius + 30) * Math.sin(this.theta);
    }
  };

  restore = () => {
    if (this.clicked && this.name !== 'sun') {
      this.clicked = false;

      this.orbitRadius = Math.sqrt(
        Math.pow(this.star.x - this.x, 2) + Math.pow(this.star.y - this.y, 2)
      );
      this.theta = Math.acos((this.x - this.star.x) / this.orbitRadius);

      if (this.y - this.star.y < 0) {
        this.theta = 2 * Math.PI - this.theta;
      }
      
      this.canvas.removeEventListener('mousemove', this.onMouseMove);
    } else if (this.clicked && this.name === 'sun') {
      this.clicked = false;
      this.star.x = this.x;
      this.star.y = this.y;
      this.canvas.removeEventListener('mousemove', this.onMouseMove);
    }

    this.canvas.removeEventListener('mousedown', this.onMouseDown);
  };
}
