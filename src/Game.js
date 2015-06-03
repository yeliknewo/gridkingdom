var Pixi = require('pixi.js'), CONST = require('./Const.js'), Tile = require('./Tile.js');

function Game(loader){
	this.loader = loader;
	this.container = new Pixi.Container();
	this.onProgress = this.onProgress.bind(this);
	this.onLoaded = this.onLoaded.bind(this);
	this.graphics = new Pixi.Graphics();
	this.selectedFilter = new Pixi.filters.ColorMatrixFilter();
	this.selectedFilter.brightness(.6, false);
	this.tileSize = new Pixi.Point(60, 60);
	this.loader
	.add('triangle', 'triangle.png')
	.add('square', 'square.png')
	.on('onProgress', this.onProgress)
	.load(this.onLoaded);
	this.state = 'load'
}

Game.prototype.setupGrid = function(width, height){
	this.grid = [];
	this.gridWidth = width;
	this.gridHeight = height;
	for(var y = 0;y < this.gridHeight;y++){
		for(var x = 0;x < this.gridWidth;x++){
			this.setTile(x, y, CONST.types.empty, CONST.ownerColors.white);
			if(y == 2){
				this.resetTile(x,y, CONST.types.triangle);
			}
		}
	}
};

Game.prototype.removeTile = function(x, y){
	this.container.removeChild(this.getTile(x,y).container);
};

Game.prototype.setTile = function(x, y, type, owner, rotation){
	var tile = new Tile(type, owner, this.textures, rotation);
	this.grid[y * this.gridWidth + x] = tile;
	tile.container.position.set(x * this.tileSize.x, y * this.tileSize.y);
	this.container.addChild(tile.container);
};

Game.prototype.resetTile= function(x, y, type, owner, rotation){
	if(typeof rotation === 'undefined'){
		rotation = this.getTile(x,y).spriteRes.rotation;
	}else if(typeof owner === 'undefined'){
		owner = this.getTile(x, y).owner;
	}
	this.removeTile(x, y);
	this.setTile(x, y, type, owner);
};

Game.prototype.setRotation = function(x, y, rotation){
	var tile = this.getTile(x,y);
	this.removeTile(x,y);
	this.setTile(x, y, tile.type, tile.owner, rotation);
};

Game.prototype.getTile = function(x, y){
	return this.grid[y * this.gridWidth + x];
};

Game.prototype.onProgress = function(event){
	console.log('Game loading: ' + event.progress);
};

Game.prototype.onLoaded = function(loader, resources){
	this.textures = {};
	this.addTexture(resources.triangle.texture, CONST.types.triangle).
	addTexture(resources.square.texture, CONST.types.square).
	drawGridBack(CONST.ownerColors.white).
	drawGridBack(CONST.ownerColors.red).
	drawGridBack(CONST.ownerColors.green).
	drawGridBack(CONST.ownerColors.blue).
	setupGrid(10, 10);
};

Game.prototype.addTexture = function(texture, name){
	this.textures[name] = texture;
	return this;
};

Game.prototype.drawGridBack = function(color){
	this.graphics.clear();
	this.graphics.lineStyle(10, 0, 255);
	this.graphics.beginFill(color);
	this.graphics.drawRect(0, 0, this.tileSize.x, this.tileSize.y);
	this.graphics.endFill();
	this.textures[color] = this.graphics.generateTexture(1, Pixi.SCALE_MODES.DEFAULT);
	return this;
};

Game.prototype.update = function(input){
	if(this.state === 'load'){
		return;	
	}else if(this.state === 'gridplace'){
		var clicked, cX, cY;
		for(var y = 0;y < this.gridHeight;y++){
			for(var x = 0;x < this.gridWidth;x++){
				if(this.getTile(x,y).clicked){
					clicked = this.getTile(x,y);
					cX = x;
					cY = y;
				}
			}
		}
		if(clicked){
			if(input.keys.space.isDown){
				this.resetTile(cX, cY, clicked.type, CONST.ownerColors.red);
			}else{
				if(clicked.type === CONST.types.square){
					this.resetTile(cX, cY, CONST.types.triangle);
				}else if(clicked.type === CONST.types.triangle){
					this.resetTile(cX, cY, CONST.types.square);
				}
			}
		}
	}
};

module.exports = Game;
