import Planet from './planet.js';
import {PlanetInfo} from './planetInfo.js';
import Background from './background.js';

class App {
  constructor() {
    this.stage = document.createElement('div');
    this.stage.setAttribute('id', 'stage');
    document.body.appendChild(this.stage);

    this.stage.appendChild(this.createAndAppendCanvas('back'));
    this.stage.appendChild(this.createAndAppendCanvas(''));
    this.stage.appendChild(this.createAndAppendCanvas('shadow'));

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    new Background(400, this.backctx, this.stageWidth, this.stageHeight);
    this.createPlanets();
    this.animate();
  }

  createAndAppendCanvas(name) {
    this[`${name}canvas`] = document.createElement('canvas');
    this[`${name}canvas`].setAttribute('id', `${name}canvas`);

    this[`${name}ctx`] = this[`${name}canvas`].getContext('2d');

    return this[`${name}canvas`];
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.sizeCanvasAndScaleCtx('');
    this.sizeCanvasAndScaleCtx('back');
    this.sizeCanvasAndScaleCtx('shadow');
  }

  sizeCanvasAndScaleCtx(name) {
    this[`${name}canvas`].width = this.stageWidth * 2;
    this[`${name}canvas`].height = this.stageHeight * 2;

    this[`${name}ctx`].scale(2, 2);
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
        planet.orbitRadius,
      );

      this.planets.push(this[planet.name]);
    });
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.shadowctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.planets.forEach((planet) => {
      if (planet.name === 'sun') {
        this.ctx.save();
        this.ctx.shadowColor = planet.color;
        this.ctx.shadowBlur = planet.radius * 1.5;
        planet.update(this.ctx, this.shadowctx);
        this.ctx.restore();
      } else {
        planet.update(this.ctx, this.shadowctx);
      }
    });
  }
}

new App();
