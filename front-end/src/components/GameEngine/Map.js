import * as PIXI from 'pixi.js';

import React, { Component } from 'react';

export class Map extends Component {
	constructor() {
		super();
		this.state = {
			app: new PIXI.Application(),
			graphics: new PIXI.Graphics(),
			container: new PIXI.Container()
		};

		this.keys = {};
	}

	keysUp = (e) => {
		this.keys[e.keyCode] = false;
	};

	keysDown = (e) => {
		this.keys[e.keyCode] = true;
	};

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

		let player = new PIXI.Sprite(texture);
		player.anchor.set(0.5);
		player.x = app.view.width / 2;
		player.y = app.view.height / 2;
		player.height = 25;
		player.width = 25;
		container.addChild(player);

		window.addEventListener('keydown', this.keysDown);
		window.addEventListener('keyup', this.keysUp);

		app.ticker.add(() => {
			if (this.keys['87']) {
				player.y -= 2;
			}

			if (this.keys['65']) {
				player.x -= 2;
			}

			if (this.keys['83']) {
				player.y += 2;
			}

			if (this.keys['68']) {
				player.x += 2;
			}
		});
	}

	render() {
		return <div id="pixi-canvas" />;
	}
}

export default Map;
