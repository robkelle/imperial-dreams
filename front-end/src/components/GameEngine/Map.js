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
		let w = 56;
		let h = 84;

		ps.playerSheet['standSouth'] = [
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(0 * w, 0, w, h))
		];

		ps.playerSheet['walkNorth'] = [
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(115, 87, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(114, 1, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(1, 173, w, h))
		];

		ps.playerSheet['walkEast'] = [
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(58, 87, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(58, 173, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(228, 87, w, h))
		];

		ps.playerSheet['walkSouth'] = [
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(1, 1, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(171, 1, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(172, 87, w, h))
		];

		ps.playerSheet['walkWest'] = [
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(57, 1, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(227, 1, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(1, 87, w, h))
		];
	};

	createPlayer = (app) => {
		this.setState({
			player: new PIXI.AnimatedSprite(this.state.playerSheet.standSouth)
		});

		let player = this.state.player;

		player.anchor.set(0.5);
		player.animationSpeed = 1.5;
		player.loop = false;
		player.x = app.view.width / 2;
		player.y = app.view.height / 2;
		app.stage.addChild(player);
		player.play();
	};

	gameLoop = () => {
		let player = this.state.player;

		// W Key
		if (this.keys['87']) {
			if (!player.playing) {
				player.textures = this.state.playerSheet.walkNorth;
				player.play();
			}

			player.y -= 2;
		}

		// A Key
		if (this.keys['65']) {
			if (!player.playing) {
				player.textures = this.state.playerSheet.walkWest;
				player.play();
			}

			player.x -= 2;
		}

		// S Key
		if (this.keys['83']) {
			if (!player.playing) {
				player.textures = this.state.playerSheet.walkSouth;
				player.play();
			}

			player.y += 2;
		}

		// D Key
		if (this.keys['68']) {
			if (!player.playing) {
				player.textures = this.state.playerSheet.walkEast;
				player.play();
			}

			player.x += 2;
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
