import * as PIXI from 'pixi.js';

/**
  @name Player

  @description In game actions for a player

  @example
    new Player(this.state.container, viewport, app, 56, 84);
*/
export class Player {
	constructor(container, viewport, app, w=56, h=84, user) {
		this.container = container;
		this.viewport = viewport;
		this.app = app;

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

	createPlayer(location) {
		new PIXI.utils.clearTextureCache();
		this.player.anchor.set(0.5);
		this.player.animationSpeed = 0.5;
		this.player.loop = false;
		this.player.zIndex = -100;
		this.player.x = location.x;
		this.player.y = location.y;
		this.container.addChild(this.player);
		this.viewport.addChild(this.container);
		this.viewport.follow(this.player);
		this.player.play();
	}

	movePlayer(keys) {
		const player = this.player;

		// W Key
		if (keys['87']) {
			if (!player.playing) {
				player.textures = this.playerSheet.walkNorth;
				player.play();
			}

			player.y -= 5;
		}

		// A Key
		if (keys['65']) {
			if (!player.playing) {
				player.textures = this.playerSheet.walkWest;
				player.play();
			}

			player.x -= 5;
		}

		// S Key
		if (keys['83']) {
			if (!player.playing) {
				player.textures = this.playerSheet.walkSouth;
				player.play();
			}

			player.y += 5;
		}

		// D Key
		if (keys['68']) {
			if (!player.playing) {
				player.textures = this.playerSheet.walkEast;
				player.play();
			}

			player.x += 5;
		}
	}
}
