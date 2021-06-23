import * as PIXI from 'pixi.js';

import React, {
  Component
} from 'react';

export class Map extends Component {
  constructor() {
    super();
    this.state = {
      app: new PIXI.Application(),
      graphics: new PIXI.Graphics(),
      container: new PIXI.Container()
    };
  }

  componentDidMount() {

    if (!this.props.cookies.cookies.isAuthorized) {
      this.props.history.push('/login');
    }

    let app = this.state.app;
    let container = this.state.container;

    app.renderer.view.style.position = 'fixed';
    app.renderer.view.style.display = 'block';
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);

    let canvas = document.getElementById('pixi-canvas');

    // Draw the PIXI canvas
    canvas.appendChild(app.view);
    app.stage.addChild(container);

    // Create a new texture
    const texture = PIXI.Texture.from(require('../../images/sampleImage.png'));

    for (let i = 0; i < 25; i++) {
      const sampleImage = new PIXI.Sprite(texture);
      sampleImage.anchor.set(0.5);
      sampleImage.x = (i % 5) * 40;
      sampleImage.y = Math.floor(i / 5) * 40;
      container.addChild(sampleImage);
    }

    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;

    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;

    // Listen for animate update
    app.ticker.add((delta) => {
      container.rotation -= 0.01 * delta;
    });
  }

  render() {
    return <div id = "pixi-canvas" / > ;
  }
}

export default Map;