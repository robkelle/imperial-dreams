import * as PIXI from 'pixi.js';

import React, { Component, Fragment } from 'react';

import { CompositeTilemap } from '@pixi/tilemap';
import { Player } from './Player';
import { TileMap } from './TileMaper';
import { Viewport } from 'pixi-viewport';
import config from '../../config.json';
import io from 'socket.io-client';

//import * as TILEMAP from '@pixi/tilemap';

export class Map extends Component {
	constructor() {
		super();
		this.state = {
			app: new PIXI.Application({ resizeTo: window }),
			player: null,
		
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

	createGrass = (app, viewport,tilemaps) => {
		let tilemap = new CompositeTilemap();
		const size = 32;
		let container = this.state.grassRender;
	//	tilemap.tile(this.state.tileSheet.outside[2], 1 * size, 1 * size )
	    tilemap.tile(tilemaps, 1 * size, 1 * size )
	
		container = tilemap;
		viewport.addChild(container);
	};

    

	doneLoading = (app, viewport,tilemaps) => {
		
		let currentUser = this.props.cookies.cookies.user;
        let player = new Player(this.state.container, viewport, app, 56, 84, currentUser);
		var y = this.state.container.width / 2;
		var x = this.state.container.height / 2;
	
		this.createGrass(app, viewport,tilemaps);


		// Adds logged in user player
		player.addPlayer(undefined, currentUser);

		// Trigger game loop
		app.ticker.add(() => {
			this.gameLoop(player);
		});
	};

	gameLoop = (player) => {
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
		

		window.addEventListener('keydown', this.keysDown);
		window.addEventListener('keyup', this.keysUp);
		let tileMap = new TileMap(this.state.container, viewport,app)
		let tilemaps = tileMap.createTileSheet(app);

		app.loader.load(() => {
			this.doneLoading(app, viewport,tilemaps);
		});
	}

	render() {
		return <Fragment />;
	}
}

export default Map;
