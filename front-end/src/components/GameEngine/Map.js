import * as PIXI from 'pixi.js';

import React, { Component, Fragment } from 'react';

import { Viewport } from 'pixi-viewport';

export class Map extends Component {
	constructor() {
		super();
		this.state = {
			app: new PIXI.Application({ resizeTo: window }),
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

	drawRectangle = (viewport, x, y) => {
		let graphic = new PIXI.Graphics();
		graphic.x = x;
		graphic.y = y;
		graphic.lineStyle(2, '0xC0C0C0');
		graphic.drawRect(0, 0, 50, 50);

		viewport.addChild(graphic);
	};

	doneLoading = (app, viewport) => {
		this.createPlayerSheet(app);
		this.createPlayer(app, viewport);
		app.ticker.add(() => {
			this.gameLoop(viewport);
		});
	};

	createPlayerSheet = (app) => {
		let ps = this.state;
		let w = 56;
		let h = 84;

		this.setState({
			ssheet: new PIXI.BaseTexture.from(app.loader.resources['king'].url)
		});

		ps.playerSheet['standSouth'] = [
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(0 * w, 0, w, h))
		];

		ps.playerSheet['walkNorth'] = [
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(115, 87, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(114, 1, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(1, 173, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(115, 87, w, h))
		];

		ps.playerSheet['walkEast'] = [
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(58, 87, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(58, 173, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(228, 87, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(58, 87, w, h))
		];

		ps.playerSheet['walkSouth'] = [
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(1, 1, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(171, 1, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(172, 87, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(1, 1, w, h))
		];

		ps.playerSheet['walkWest'] = [
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(57, 1, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(227, 1, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(1, 87, w, h)),
			new PIXI.Texture(this.state.ssheet, new PIXI.Rectangle(57, 1, w, h))
		];
	};

	createPlayer = (app, viewport) => {
		// Sets the default stance of the player to standing South
		this.setState({
			player: new PIXI.AnimatedSprite(this.state.playerSheet.standSouth)
		});

		let player = this.state.player;

		player.anchor.set(0.5);
		player.animationSpeed = 0.5;
		player.loop = false;
		player.x = app.view.width / 2;
		player.y = app.view.height / 2;
		player.zIndex = 1;
		viewport.addChild(player);
		viewport.follow(player);
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

			player.y -= 5;
		}

		// A Key
		if (this.keys['65']) {
			if (!player.playing) {
				player.textures = this.state.playerSheet.walkWest;
				player.play();
			}

			player.x -= 5;
		}

		// S Key
		if (this.keys['83']) {
			if (!player.playing) {
				player.textures = this.state.playerSheet.walkSouth;
				player.play();
			}

			player.y += 5;
		}

		// D Key
		if (this.keys['68']) {
			if (!player.playing) {
				player.textures = this.state.playerSheet.walkEast;
				player.play();
			}

			player.x += 5;
		}
	};

	// Life Cycle Components
	componentWillUnmount() {
		// Removes caching when component is unmounted
		new PIXI.utils.clearTextureCache();
	}

	componentDidMount() {
		if (!this.props.cookies.cookies.isAuthorized) {
			this.props.history.push('/login');
		}

		let app = this.state.app;

		// Draw the PIXI canvas
		document.body.appendChild(app.view);

		// Create viewport
		const viewport = new Viewport({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
			worldWidth: 1000,
			worldHeight: 1000,

			interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
		});

		app.renderer.view.style.position = 'fixed';
		app.renderer.view.style.display = 'block';
		// The root display container that's rendered
		app.stage.addChild(viewport);

		let gridX = 100;
		let gridY = 100;
		for (var x = 0; x < gridX; x++) {
			for (var y = 0; y < gridY; y++) {
				this.drawRectangle(viewport, x * 50, y * 50);
			}
		}

		// Activate plugins
		viewport.drag().pinch().wheel().decelerate().clampZoom({ minWidth: 1000, minHeight: 1000, maxWidth: 4000, maxHeight: 4000 });

		// Creates player texture
		app.loader.add('king', require('../../images/characterSprite.png'));

		window.addEventListener('keydown', this.keysDown);
		window.addEventListener('keyup', this.keysUp);

		app.loader.load(() => {
			this.doneLoading(app, viewport);
		});
	}

	render() {
		return <Fragment />;
	}
}

export default Map;
