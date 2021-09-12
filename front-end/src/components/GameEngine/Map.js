
import * as TILEMAP from '@pixi/tilemap';
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
			tileSheet: {},
		    tentContainer: new PIXI.Container(),
			container: new PIXI.Container(),
			grassRender: new PIXI.Container()
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
		let app = this.state.app
		var container = this.state.container
		let graphic = new PIXI.Graphics();
		graphic.x = x;
		graphic.y = y;
		graphic.lineStyle(2, '0xC0C0C0');
		graphic.drawRect(0, 0, 32, 32);
		
		container.x = app.view.width / 2;
		container.y = app.view.height / 2;
		container.pivot.x = container.width / 2;
        container.pivot.y = container.height / 2;
		container.visible = true;
        container.addChild(graphic)
		viewport.addChild(container);
	};

	addGrass = (viewport) => {
		let app = this.state.app
		var container = this.state.container
	
        container.pivot.y = container.height / 2;
		container.visible = true;
		let graphic = new PIXI.Texture.from(app.loader.resources['grass'].url)
		let sprite = new PIXI.Sprite(graphic);
		sprite.x = 0;
		sprite.y = 0;
		for (let i =0; i< 200; i++){
			for (var y = 0; y < 200; y++){

				let sprite = new PIXI.Sprite(graphic);
				sprite.x += 32 * i;
				sprite.y += 32 * y;
				container.addChild(sprite)

			}
		}			
		viewport.addChild(container);

	}

	addStone = (viewport) => {
		let app = this.state.app
		var container = this.state.container
	
        container.pivot.y = container.height / 2;
		container.visible = true;
		let graphic = new PIXI.Texture.from(app.loader.resources['tents'].url)
		let sprite = new PIXI.Sprite(graphic);
		sprite.x = 0;
		sprite.y = 0;
		container.addChild(sprite)
		viewport.addChild(container);



		

	}
	

	createTileSheet = (app) => {		
		let ps = this.state;
		let w = 48;
		let h = 48;

		this.setState({
			tsheet: new PIXI.BaseTexture.from(app.loader.resources['tents'].url)
		});

		ps.tileSheet['tent'] = [
			// Tent
			new PIXI.Texture(this.state.tsheet, new PIXI.Rectangle(5 * w, 0* h, 3*w, 3*h)),
			//Tent red accent
			new PIXI.Texture(this.state.tsheet, new PIXI.Rectangle(5 * w, 3* h, 3*w, 3*h)),
			new PIXI.Texture(this.state.tsheet, new PIXI.Rectangle(8 * w, 6* h, 2*w, 2*h)),   
			new PIXI.Texture(this.state.tsheet, new PIXI.Rectangle(12 * w, 2* h, 1*w, 1*h)),
			new PIXI.Texture(this.state.tsheet, new PIXI.Rectangle(12 * w, 3* h, 1*w, 1*h))

			
		];

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
/*
	buildGrid = (viewport) => {
		let gridX = 50;
		let gridY = 50;

		for (var x = 0; x < gridX; x++) {
			for (var y = 0; y < gridY; y++) {
				this.drawRectangle(viewport, x * 32, y * 32);
			}
		}
	};

*/	

	doneLoading = (app, viewport) => {
    this.addGrass(viewport);
	//wthis.addStone(viewport)
	var y = this.state.container.width /2;
	var x = this.state.container.height /2;


		//ps.tileSheet.tent[0])
	
//	app,viewport,x,y,texture
	//	this.buildGrid(viewport);
	   let ps = this.state
		this.createPlayerSheet(app);
		this.createPlayer(app, viewport);
		this.createTileSheet(app)	;

		this.createTiles(app, viewport,x -559,y -200,this.state.tileSheet.tent[3] );
		this.createTiles(app, viewport,x -800,y -300,this.state.tileSheet.tent[2] );
		this.createTiles(app, viewport,x -800,y -300,this.state.tileSheet.tent[2] );
		this.createTiles(app, viewport,x -800,y -330,this.state.tileSheet.tent[2] );
		this.createTiles(app, viewport,x -800,y -325,this.state.tileSheet.tent[2] );
		this.createTiles(app, viewport,x -800,y -320,this.state.tileSheet.tent[2] );
		this.createTiles(app, viewport,x -800,y -300,this.state.tileSheet.tent[2] );
		this.createTiles(app, viewport,x -575,y -400,this.state.tileSheet.tent[2] );
		this.createTiles(app, viewport,x -800,y -435,this.state.tileSheet.tent[2] );
	    this.createTiles(app, viewport,x -500,y -400,this.state.tileSheet.tent[1] );
		this.createTiles(app, viewport,x -700,y -400,this.state.tileSheet.tent[1] );
	
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
		player.x = this.state.container.width / 2;
		player.y = this.state.container.height / 2;
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
		app.loader.add('map', require('../../images/maps/Map003.png'));
		app.loader.add('chest', require('../../images/maps/chest.png'));
		app.loader.add('brick_wall', require('../../images/maps/brick_wall.png'));
		app.loader.add('brick', require('../../images/maps/brick.png'));
		app.loader.add('tough', require('../../images/maps/tough.png'));
		app.loader.add('red_chest', require('../../images/maps/red_chest.png'));
		app.loader.add('grass', require('../../images/maps/grass.png'));
		app.loader.add('grounds', require('../../images/tilesets/Outside_A4.png'))
		app.loader.add('tents', require ('../../images/tilesets/Outside_B.png') )

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
