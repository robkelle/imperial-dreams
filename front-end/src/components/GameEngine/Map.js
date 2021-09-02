import * as PIXI from 'pixi.js';

import React, { Component } from 'react';

export class Map extends Component {
	constructor() {
		super();
		this.state = {
			app: new PIXI.Application(),
			graphics: new PIXI.Graphics(),
			container: new PIXI.Container(),
			playerSheet: {}
		};

		this.keys = {};
	}

	keysUp = (e) => {
		this.keys[e.keyCode] = false;
	};

	keysDown = (e) => {
		this.keys[e.keyCode] = true;
	};

	doneLoading = (app) => {
		this.createPlayerSheet(app);
		this.createPlayer(app);
		app.ticker.add(() => {
			this.gameLoop();
		});
	};

	createPlayerSheet = (app) => {
		let ps = this.state;
		this.setState({
			ssheet: new PIXI.BaseTexture.from(app.loader.resources['king'].url)
		});
		let w = 65;
		let h = 90;

		ps.playerSheet['standSouth'] = [
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(1.2 * w, 0, w, h))
		];

		ps.playerSheet['walkNorth'] = [];

		ps.playerSheet['walkEast'] = [];

		ps.playerSheet['walkSouth'] = [
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(1.2 * w, 0, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(0 * w, 0, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(2.2 * w, 0, w, h))
		];

		ps.playerSheet['walkWest'] = [];
	};

	createPlayer = (app) => {
		this.setState({
			player: new PIXI.AnimatedSprite(this.state.playerSheet.standSouth)
		});
		this.state.player.anchor.set(0.5);
		this.state.player.animationSpeed = 2;
		this.state.player.loop = false;
		this.state.player.x = app.view.width / 2;
		this.state.player.y = app.view.height / 2;
		app.stage.addChild(this.state.player);
		this.state.player.play();
	};

	gameLoop = () => {
		// W Key
		if (this.keys['87']) {
			//player.y -= 2;
		}

		// A Key
		if (this.keys['65']) {
			//player.x -= 2;
		}

		// S Key
		if (this.keys['83']) {
			if (!this.state.player.playing) {
				this.state.player.textures = this.state.playerSheet.walkSouth;
				this.state.player.play();
			}

			this.state.player.y += 2;
		}

		// D Key
		if (this.keys['68']) {
			//player.x += 2;
		}
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
		app.loader.add('king', require('../../images/characterSprite.png'));
		app.loader.load(() => {
			this.doneLoading(app);
		});

		window.addEventListener('keydown', this.keysDown);
		window.addEventListener('keyup', this.keysUp);

		//app.ticker.add(() => this.gameLoop(player));
	}

	render() {
		return <div id='pixi-canvas' />;
	}
}

export default Map;
