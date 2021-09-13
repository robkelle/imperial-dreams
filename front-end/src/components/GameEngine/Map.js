
import  {CompositeTilemap} from '@pixi/tilemap';
import * as PIXI from 'pixi.js';
 

import React, { Component, Fragment } from 'react';

import { Viewport } from 'pixi-viewport';

export class Map extends Component {
	constructor() {
		super();
		this.state = {
			app: new PIXI.Application({ resizeTo: window }),
			playerSheet: {},
			ssheet: null,
			player: null,
			tsheet: null,
			fsheet: null,
			tileSheet: {},
		    tentContainer: new PIXI.Container(),
			container: new PIXI.Container(),
			grassRender: new PIXI.Container(),
		};

		this.keys = {};
	}

	keysUp = (e) => {
		this.keys[e.keyCode] = false;
	};

	keysDown = (e) => {
		this.keys[e.keyCode] = true;
	};

	createGrass = (app,viewport) =>{
    let tilemap = new CompositeTilemap();
	const size =32
	let container = this.state.grassRender
   

		for (let i =0; i< 5000; i++){
			for (var y = 0; y < 100; y++){
			tilemap.tile(app.loader.resources['grass'].url, i * size, y* size)
			}
		}
   container = tilemap
   viewport.addChild(container)
   	   }
	
	createTiles = (app,viewport,x,y,texture) =>{
		let ps = this.state

		    let sprite = new PIXI.Sprite(texture);
			let container = this.state.container

			sprite.anchor.set(.05);
			sprite.loop = false;
			sprite.x = x
			sprite.y = y
			sprite.zIndex = 1;
			container.addChild(sprite);
			viewport.addChild(container)
			
		};
	
	doneLoading = (app, viewport) => {
	    let ps = this.state
		this.createGrass(app,viewport)
		this.createPlayerSheet(app);
		this.createPlayer(app,viewport);

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
        let container = this.state.container
		player.anchor.set(.5);
		player.animationSpeed = 0.5;
		player.loop = false;
		player.x = 2500
		player.y = 1500
		player.zIndex = 1;
		container.addChild(player);
		viewport.addChild(container)
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
		this.state.app.destroy(true);
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

		// Creates player texture
		app.loader.add('king', require('../../images/characterSprite.png'));
		app.loader.add('grass', require('../../images/grass.png'));
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
