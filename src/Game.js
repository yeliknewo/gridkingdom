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
	.on('onProgress', this.onProgress)
	.load(this.onLoaded);
	this.state = 'load'
}

Game.prototype.setupGrid = function(width, height){
	this.grid = [];
	for(var y = 0;y < height;y++){
		for(var x = 0;x < width;x++){
			var tile = new Tile(CONST.types.empty, this.textures);
			tile.sprite.position.set(x * this.textures.empty.width, y * this.textures.empty.height);
			this.grid.push(tile);
			this.container.addChild(tile.sprite);
		}
	}
};

Game.prototype.onProgress = function(event){
	console.log('Game loading: ' + event.progress);
};

Game.prototype.onLoaded = function(loader, resources){
	this.textures = {
		empty: resources.emptygrid.texture, 
		metal: resources.metalgrid.texture, 
		grain: resources.graingrid.texture,
		tree: resources.treegrid.texture
	};
	this.setupGrid(10, 10);
};

Game.prototype.update = function(input){
	if(this.state === 'load'){
		return;	
	}else if(this.state === 'gridplace'){
		for(var i = 0;i < this.grid.length;i++){
			if(this.grid[i].clicked){
				this.grid[i].sprite.filters = [this.selectedFilter];
				
			}
		}
	}
};

module.exports = Game;
