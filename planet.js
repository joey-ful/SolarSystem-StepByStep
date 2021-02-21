export default class Planet {
  constructor(name, star, radius, color, velocity, orbitRadius) {
    this.name = name;
    this.star = star;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.orbitRadius = orbitRadius;

    // this.velocity = 0;
    this.theta = Math.random() * Math.PI * 2;
    // this.theta = Math.PI / 2;
    this.clicked = false;
    this.mouse = {
      x: star.x,
      y: star.y,
    };

    this.img = new Image();
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
    // this.test(shadowctx);
    this.draw(ctx);
    // this.mid(ctx);
  }

  draw(ctx) {
    ctx.beginPath();

    let width = this.radius * 2;

    if (this.name === 'saturn') {
      width = this.radius * 4;
      this.x -= this.radius * 1;
    } else if (this.name === 'uranus') {
      this.x -= this.radius * 1.1;
      width = this.radius * 4.2;
    }

    ctx.drawImage(
      this.img,
      this.x - this.radius,
      this.y - this.radius,
      width,
      this.radius * 2
    );
    this.img.src = `./srcs/${this.name}.png`;
    ctx.closePath();
  }

  mid(ctx) {
    let canvas = document.getElementById('canvas');

    let stageWidth = canvas.clientWidth;
    let stageHeight = canvas.clientHeight;
    ctx.beginPath();
    ctx.moveTo(stageWidth / 2, stageHeight / 2);
    ctx.lineTo(stageWidth / 2, stageHeight);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  test(shadowctx) {
    if (this.name !== 'sun' && this.name !== 'moon') {
      let offset = Math.PI - this.theta;
      Ax = this.x - this.radius * Math.sin(offset);
      Ay = this.y - this.radius * Math.cos(offset);
      Bx = this.x + this.radius * Math.sin(offset);
      By = this.y + this.radius * Math.cos(offset);

      shadowctx.beginPath();
      shadowctx.arc(Ax, Ay, 2, 0, Math.PI * 2);
      shadowctx.fillStyle = 'hotpink';
      shadowctx.fill();
      shadowctx.closePath();

      shadowctx.beginPath();
      shadowctx.arc(Bx, By, 2, 0, Math.PI * 2);
      shadowctx.fillStyle = 'cyan';
      shadowctx.fill();
      shadowctx.closePath();
    }
  }

  drawShadow(shadowctx) {
    if (this.name !== 'sun' && this.name !== 'moon') {
      this.findShadowLength();
      this.findShadowCurveDepth();
      this.findShadowPoints();

      shadowctx.beginPath();
      shadowctx.moveTo(this.Ax, this.Ay);
      shadowctx.bezierCurveTo(
        this.Ax + this.BezierX,
        this.Ay + this.BezierY,
        this.Bx + this.BezierX,
        this.By + this.BezierY,
        this.Bx,
        this.By
      );
      shadowctx.lineTo(this.Bx + this.shadowLengthX, this.By + this.shadowLengthY);
      shadowctx.bezierCurveTo(
        this.Bx + this.BezierX + this.shadowLengthX,
        this.By + this.BezierY + this.shadowLengthY,
        this.Ax + this.BezierX + this.shadowLengthX,
        this.Ay + this.BezierY + this.shadowLengthY,
        this.Ax + this.shadowLengthX,
        this.Ay + this.shadowLengthY
      );
      shadowctx.lineTo(this.Ax, this.Ay);
      shadowctx.fillStyle = 'rgba(33, 69, 104, 0.4)';
      shadowctx.fill();
      shadowctx.closePath();
    }
  }

  findShadowLength() {
    this.shadowLengthX = (this.radius + 20) * Math.cos(this.theta);
    this.shadowLengthY = (this.radius + 20) * Math.sin(this.theta);
  }

  findShadowCurveDepth() {
    this.BezierX = (this.radius / 1.5) * Math.cos(this.theta);
    this.BezierY = (this.radius / 1.5) * Math.sin(this.theta);
  }

  findShadowPoints() {
    let radius = this.radius;

    if (this.name === 'saturn') {
      radius = this.radius * 0.8;
    } else if (this.name === 'earth') {
      this.shadowLengthX = (this.radius + 30) * Math.cos(this.theta);
      this.shadowLengthY = (this.radius + 30) * Math.sin(this.theta);
    } else if (this.name === 'mars') {
      this.shadowLengthX = (this.radius + 46) * Math.cos(this.theta);
      this.shadowLengthY = (this.radius + 46) * Math.sin(this.theta);
    }

    let angle = Math.PI - this.theta;
    this.Ax = this.x - radius * Math.sin(angle);
    this.Ay = this.y - radius * Math.cos(angle);
    this.Bx = this.x + radius * Math.sin(angle);
    this.By = this.y + radius * Math.cos(angle);
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
    let radius = this.radius;
    if (this.name === 'saturn') {
      radius = this.radius * 4;
    } else if (this.name === 'uranus') {
      raidus = this.radius * 4.2;
    }

    if (
      Math.abs(this.offsetX) <= radius &&
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
