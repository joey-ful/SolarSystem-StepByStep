import Planet from './planet.js';
import {PlanetInfo} from './planetInfo.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    this.createPlanets();
    this.animate();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;

    this.ctx.scale(2, 2);
  }

  createPlanets() {
    this.planets = [];

    this.sunStar = {
      x: this.stageWidth / 2,
      y: this.stageHeight / 2,
    };

    PlanetInfo.forEach((planet) => {
      this[planet.name] = new Planet(
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

    this.ctx.fillStyle = 'rgba(77, 87, 105, 0.1)';
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    this.planets.forEach((planet) => {
      planet.update(this.ctx);
    });
  }
}

new App();
