import * as PIXI from 'pixi.js';

import React, { Component, Fragment } from 'react';

import { CompositeTilemap } from '@pixi/tilemap';
import { Player } from './Player';
import { Viewport } from 'pixi-viewport';
import config from '../../config.json';
import io from 'socket.io-client';

//import * as TILEMAP from '@pixi/tilemap';

export class Map extends Component {
	constructor() {
		super();
		this.state = {
			app: new PIXI.Application({ resizeTo: window }),
			tsheet: null,
			fsheet: null,
			player: null,
			tileSheet: {},
			tentContainer: new PIXI.Container(),
			container: new PIXI.Container(),
			grassRender: new PIXI.Container()
		};

		this.FPS = 60;
		this.keys = {};
		this.socket = io(`${config.API.DOMAIN}:${config.API.PORT}`);
	}

	keysUp = (e) => {
		this.keys[e.keyCode] = false;
	};

	keysDown = (e) => {
		this.keys[e.keyCode] = true;
	};

	createGrass = (app, viewport) => {
		let tilemap = new CompositeTilemap();
		const size = 32;
		let container = this.state.grassRender;

		tilemap.tile(app.loader.resources['grass'].url, 1 * size, 1 * size);

		container = tilemap;
		viewport.addChild(container);
	};

	createTileSheet = (app) => {
		let ps = this.state;
		let w = 48;
		let h = 48;

		this.setState({
			tsheet: new PIXI.BaseTexture.from(app.loader.resources['tents'].url)
		});

		ps.tileSheet['tent'] = [
			// Tent
			new PIXI.Texture(this.state.tsheet, new PIXI.Rectangle(5 * w, 0 * h, 3 * w, 3 * h)),
			//Tent red accent
			new PIXI.Texture(this.state.tsheet, new PIXI.Rectangle(5 * w, 3 * h, 3 * w, 3 * h)),
			new PIXI.Texture(this.state.tsheet, new PIXI.Rectangle(8 * w, 6 * h, 2 * w, 2 * h)),
			new PIXI.Texture(this.state.tsheet, new PIXI.Rectangle(12 * w, 2 * h, 1 * w, 1 * h)),
			new PIXI.Texture(this.state.tsheet, new PIXI.Rectangle(12 * w, 3 * h, 1 * w, 1 * h)),
			new PIXI.Texture(this.state.tsheet, new PIXI.Rectangle(12 * w, 3 * h, 1 * w, 1 * h)),
			new PIXI.Texture(this.state.tsheet, new PIXI.Rectangle(12 * w, 4 * h, 1 * w, 1 * h))
		];
	};

	createTileOutside = (app) => {
		let ps = this.state;
		let w = 48;
		let h = 48;

		this.setState({
			fsheet: new PIXI.BaseTexture.from(app.loader.resources['outside'].url)
		});

		ps.tileSheet['outside'] = [
			new PIXI.Texture(this.state.fsheet, new PIXI.Rectangle(5 * w, 0 * h, 3 * w, 3 * h)),
			new PIXI.Texture(this.state.fsheet, new PIXI.Rectangle(5 * w, 3 * h, 3 * w, 3 * h)),
			new PIXI.Texture(this.state.fsheet, new PIXI.Rectangle(8 * w, 6 * h, 2 * w, 2 * h)),
			new PIXI.Texture(this.state.fsheet, new PIXI.Rectangle(12 * w, 2 * h, 1 * w, 1 * h)),
			new PIXI.Texture(this.state.tsheet, new PIXI.Rectangle(12 * w, 3 * h, 1 * w, 1 * h)),
			new PIXI.Texture(this.state.fsheet, new PIXI.Rectangle(12 * w, 3 * h, 1 * w, 1 * h)),
			new PIXI.Texture(this.state.fsheet, new PIXI.Rectangle(12 * w, 4 * h, 1 * w, 1 * h))
		];
	};

	createTiles = (app, viewport, x, y, texture) => {
		let sprite = new PIXI.Sprite(texture);
		let container = this.state.container;

		sprite.anchor.set(0.05);
		sprite.loop = false;
		sprite.x = x;
		sprite.y = y;
		sprite.zIndex = 1;
		container.addChild(sprite);
		viewport.addChild(container);
	};

	doneLoading = (app, viewport) => {
		this.createGrass(app, viewport);

		let currentUser = this.props.cookies.cookies.user;
    let player = new Player(this.state.container, viewport, app, 56, 84, currentUser);
		var y = this.state.container.width / 2;
		var x = this.state.container.height / 2;

		this.createTileSheet(app);
		this.createTileOutside(app);
		this.createTiles(app, viewport, x - 900, y - 100, this.state.tileSheet.outside[2]);
		this.createTiles(app, viewport, x - 559, y - 200, this.state.tileSheet.tent[3]);
		this.createTiles(app, viewport, x - 800, y - 200, this.state.tileSheet.tent[4]);
		this.createTiles(app, viewport, x - 559, y - 200, this.state.tileSheet.tent[3]);
		this.createTiles(app, viewport, x - 900, y - 300, this.state.tileSheet.tent[2]);
		this.createTiles(app, viewport, x - 800, y - 300, this.state.tileSheet.tent[2]);
		this.createTiles(app, viewport, x - 575, y - 400, this.state.tileSheet.tent[2]);
		this.createTiles(app, viewport, x - 800, y - 435, this.state.tileSheet.tent[2]);
		this.createTiles(app, viewport, x - 500, y - 400, this.state.tileSheet.tent[1]);
		this.createTiles(app, viewport, x - 700, y - 400, this.state.tileSheet.tent[1]);
		this.createTiles(app, viewport, x - 500, y - 150, this.state.tileSheet.tent[5]);

		// Adds logged in user player
		player.addPlayer(undefined, currentUser);

		// Trigger game loop
		app.ticker.add(() => {
			this.gameLoop(player);
		});
	};

	gameLoop = (player) => {
		// Removes caching when component is unmounted
		new PIXI.utils.clearTextureCache();

		let user = this.props.cookies.cookies.user;

		// Call player movement to key-binds
		player.movePlayer(this.keys, user);
	};

	// Life Cycle Components
	componentWillUnmount() {
		// Removes caching when component is unmounted
		new PIXI.utils.clearTextureCache();

		// Destroy and don't use after this
		this.state.app.destroy(true);

		// Disconnect socket
		this.socket.disconnect();
	}

	componentDidMount() {
		// Removes caching when component is unmounted
		new PIXI.utils.clearTextureCache();

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

		// Activate plugins
		viewport.drag().pinch().wheel().decelerate().clampZoom({ minWidth: 1000, minHeight: 1000, maxWidth: 4000, maxHeight: 4000 });

		// Load textures
		app.loader.add('map', require('../../images/maps/Map003.png'));
		app.loader.add('chest', require('../../images/maps/chest.png'));
		app.loader.add('brick_wall', require('../../images/maps/brick_wall.png'));
		app.loader.add('brick', require('../../images/maps/brick.png'));
		app.loader.add('tough', require('../../images/maps/tough.png'));
		app.loader.add('red_chest', require('../../images/maps/red_chest.png'));
		app.loader.add('grass', require('../../images/maps/grass.png'));
		app.loader.add('grounds', require('../../images/tilesets/Outside_A4.png'));
		app.loader.add('tents', require('../../images/tilesets/Outside_B.png'));
		app.loader.add('outside', require('../../images/tilesets/Outside_B.png'));

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
