import * as PIXI from 'pixi.js';
import React, { Component, Fragment } from 'react';
import { CompositeTilemap } from '@pixi/tilemap';
import { Viewport } from 'pixi-viewport';
import config from '../../config.json';




/**
  @name TileMap

  @description In game actions for a player

  @example
    new Player(this.state.container, viewport, app, 56, 84);
*/
export class TileMap {
	constructor(container, viewport, app) {
		this.app = app;
        this.state = {
			tsheet: null,
			tileSheet: {},
		};

		};
     
        
        createTileSheet = (app) => {
            this.loadAssets(app)
            let ps = this.state;
            let w = 48;
            let h = 48;
             ps.tsheet = new PIXI.BaseTexture.from(app.loader.resources['tents'].url)

    
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
            return ps.tileSheet.tent[2]
	};



        loadAssets = (app) => {
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
       
        }
    }

	
