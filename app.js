import Planet from './planet.js';
import {PlanetInfo} from './planetInfo.js';
import Background from './background.js';

class App {
  constructor() {
    this.stage = document.createElement('div');
    this.stage.setAttribute('id', 'stage');

    this.backcanvas = document.createElement('canvas');
    this.backcanvas.setAttribute('id', 'backcanvas');
    this.backctx = this.backcanvas.getContext('2d');

    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.stage);
    this.stage.appendChild(this.backcanvas);
    this.stage.appendChild(this.canvas);

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    new Background(400, this.backctx, this.stageWidth, this.stageHeight);
    this.createPlanets();
    this.animate();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;

    this.backcanvas.width = this.stageWidth * 2;
    this.backcanvas.height = this.stageHeight * 2;

    this.backctx.scale(2, 2);
    this.ctx.scale(2, 2);
  }

  createPlanets() {
    this.planets = [];

    this.sunStar = {
      name: 'sunStar',
      x: this.stageWidth / 2,
      y: this.stageHeight / 2,
    };

    PlanetInfo.forEach((planet) => {
      this[planet.name] = new Planet(
        planet.name,
        this[planet.star],
        planet.radius,
        planet.color,
        planet.velocity,
        planet.orbitRadius
      );

      this.planets.push(this[planet.name]);
    });
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.planets.forEach((planet) => {
      if (planet.name === 'sun') {
        this.ctx.save();
        this.ctx.shadowColor = planet.color;
        this.ctx.shadowBlur = planet.radius * 1.5;
        planet.update(this.ctx);
        this.ctx.restore();
      } else {
        planet.update(this.ctx);
      }
    });
  }
}

new App();
