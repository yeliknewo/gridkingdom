var Pixi = require('pixi.js'), CONST = require('./Const.js'), Tile = require('./Tile.js');

function Game(loader){
	this.loader = loader;
	this.container = new Pixi.Container();
	this.update = this.update.bind(this);
	this.onProgress = this.onProgress.bind(this);
	this.onLoaded = this.onLoaded.bind(this);
	this.setupGrid = this.setupGrid.bind(this);
	this.selectedFilter = new Pixi.filters.ColorMatrixFilter();
	this.selectedFilter.brightness(.6, false);
	this.loader.add('emptygrid', 'emptygrid.png')
	.add('graingrid', 'graingrid.png')
	.add('metalgrid', 'metalgrid.png')
	.add('treegrid', 'treegrid.png')
	.add('housegrid', 'housegrid.png')
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
			var tile = new Tile(CONST.types.empty, this.textures);
			tile.sprite.position.set(x * this.textures.empty.width, y * this.textures.empty.height);
			this.grid.push(tile);
			this.container.addChild(tile.sprite);
		}
	}
};

Game.prototype.setTile = function(x, y, type){
	this.container.removeChild(this.grid[y * this.gridWidth + x].sprite);
	var tile = new Tile(type, this.textures);
	this.grid[y * this.gridWidth + x] = tile;
	tile.sprite.position.set(x * this.textures.empty.width, y * this.textures.empty.height);
	this.container.addChild(tile.sprite);
};

Game.prototype.onProgress = function(event){
	console.log('Game loading: ' + event.progress);
};

Game.prototype.onLoaded = function(loader, resources){
	this.textures = {
		empty: resources.emptygrid.texture, 
		metal: resources.metalgrid.texture, 
		grain: resources.graingrid.texture,
		tree: resources.treegrid.texture,
		house: resources.housegrid.texture
	};
	this.setupGrid(10, 10);
};

Game.prototype.update = function(input){
	if(this.state === 'load'){
		return;	
	}else if(this.state === 'gridplace'){
		for(var y = 0;y < this.gridHeight;y++){
			for(var x = 0;x < this.gridWidth;x++){
				if(this.grid[y * this.gridWidth + x].clicked){
					var type = this.grid[y * this.gridWidth + x].type;
					if(type === CONST.types.empty){
						this.setTile(x, y, CONST.types.tree);
					}else if(type === CONST.types.tree){
						this.setTile(x, y, CONST.types.metal);
					}else if(type === CONST.types.metal){
						this.setTile(x, y, CONST.types.grain);
					}else if(type === CONST.types.grain){
						this.setTile(x, y, CONST.types.house);
					}else if(type == CONST.types.house){
						this.setTile(x, y, CONST.types.empty);
					}
				}
			}
		}
	}
};

module.exports = Game;
