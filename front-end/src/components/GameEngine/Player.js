import * as PIXI from 'pixi.js';

import config from '../../config.json';
import io from 'socket.io-client';

/**
  @name Player

  @description In game actions for a player

  @example
    new Player(this.state.container, viewport, app, 56, 84);
*/
export class Player {
	constructor(container, viewport, app, w = 56, h = 84, user) {
		this.container = container;
		this.viewport = viewport;
		this.app = app;
		this.socket = io(`${config.API.DOMAIN}:${config.API.PORT}`);

		// Load character sprite sheet
		app.loader.add(user, require('../../images/characterSprite.png'));
		this.spriteSheet = new PIXI.BaseTexture.from(app.loader.resources[user].url);

		// Build character sprite animations
		this.playerSheet = {
			standSouth: [
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(0 * w, 0, w, h))
			],
			walkNorth: [
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(115, 87, w, h)),
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(114, 1, w, h)),
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(1, 173, w, h)),
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(115, 87, w, h))
			],
			walkEast: [
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(58, 87, w, h)),
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(58, 173, w, h)),
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(228, 87, w, h)),
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(58, 87, w, h))
			],
			walkSouth: [
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(1, 1, w, h)),
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(171, 1, w, h)),
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(172, 87, w, h)),
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(1, 1, w, h))
			],
			walkWest: [
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(57, 1, w, h)),
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(227, 1, w, h)),
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(1, 87, w, h)),
				new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(57, 1, w, h))
			]
		};

		// Initialize character animation for player
		this.player = new PIXI.AnimatedSprite(this.playerSheet.standSouth);
	}

	addPlayer(location = { x: this.container.width / 2, y: this.container.height / 2 }, currentUser) {
		if (currentUser) {
			this.socket.emit('currentPlayerPosition', {
				username: currentUser
			});

			this.socket.on('currentPlayerPosition', (res) => {
				this.player.anchor.set(0.5);
				this.player.animationSpeed = 0.5;
				this.player.loop = false;
				this.player.zIndex = -100;
				this.player.x = res.position.x;
				this.player.y = res.position.y;
				this.container.addChild(this.player);
				this.viewport.addChild(this.container);
				this.viewport.follow(this.player);
				this.player.play();
			});
		}
	}

	loadConnectedPlayers(app, w, h, currentUser, keys) {
		this.socket.emit('loadPlayers');

		this.socket.on('generatePlayers', (res) => {
			if (res.username === currentUser) {
			} else {
				// Load character sprite sheet
				app.loader.add(res.username, require('../../images/characterSprite.png'));
				this.spritesheet = new PIXI.BaseTexture.from(app.loader.resources[res.username].url);

				// Build character sprite animations
				this.playerSheet = {
					standSouth: [
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(0 * w, 0, w, h))
					],
					walkNorth: [
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(115, 87, w, h)),
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(114, 1, w, h)),
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(1, 173, w, h)),
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(115, 87, w, h))
					],
					walkEast: [
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(58, 87, w, h)),
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(58, 173, w, h)),
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(228, 87, w, h)),
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(58, 87, w, h))
					],
					walkSouth: [
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(1, 1, w, h)),
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(171, 1, w, h)),
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(172, 87, w, h)),
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(1, 1, w, h))
					],
					walkWest: [
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(57, 1, w, h)),
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(227, 1, w, h)),
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(1, 87, w, h)),
						new PIXI.Texture(this.spriteSheet, new PIXI.Rectangle(57, 1, w, h))
					]
				};

				// Initialize character animation for player
				this.player = new PIXI.AnimatedSprite(this.playerSheet.standSouth);

				this.addPlayer(res.position, res.currentUser);
				this.movePlayer(keys, res.username);
			}
		});
	}

	movePlayer(keys, user) {
		const player = this.player;

		// W Key
		if (keys['87']) {
			if (!player.playing) {
				player.textures = this.playerSheet.walkNorth;
				player.play();
			}

			player.y -= 5;
			this.socket.emit('setPlayerPosition', {
				username: user,
				positionX: player.position._x,
				positionY: player.position._y
			});
		}

		// A Key
		if (keys['65']) {
			if (!player.playing) {
				player.textures = this.playerSheet.walkWest;
				player.play();
			}

			player.x -= 5;
			this.socket.emit('setPlayerPosition', {
				username: user,
				positionX: player.position._x,
				positionY: player.position._y
			});
		}

		// S Key
		if (keys['83']) {
			if (!player.playing) {
				player.textures = this.playerSheet.walkSouth;
				player.play();
			}

			player.y += 5;
			this.socket.emit('setPlayerPosition', {
				username: user,
				positionX: player.position._x,
				positionY: player.position._y
			});
		}

		// D Key
		if (keys['68']) {
			if (!player.playing) {
				player.textures = this.playerSheet.walkEast;
				player.play();
			}

			player.x += 5;
			this.socket.emit('setPlayerPosition', {
				username: user,
				positionX: player.position._x,
				positionY: player.position._y
			});
		}
	}
}
