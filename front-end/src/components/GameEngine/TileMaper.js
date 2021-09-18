import * as PIXI from 'pixi.js';
import React, { Component, Fragment } from 'react';
import { CompositeTilemap } from '@pixi/tilemap';
import { Viewport } from 'pixi-viewport';
import config from '../../config.json';




/**
  @name TileMap

  @description Creates new tiles

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
            return ps.tileSheet
	};

        loadAssets = (app) => {	
		app.loader.add('tents', require('../../images/tilesets/Outside_B.png'));

        }
    }

	
