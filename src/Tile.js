var Pixi = require('pixi.js'), CONST = require('./Const.js');

function Tile(type, textures){
	this.onClicked = this.onClicked.bind(this);
	this.type = type;
	var texture;
	if(type == CONST.types.empty){
		texture = textures.empty;
	}else if(type == CONST.types.tree){
		texture = textures.tree;
	}else if(type == CONST.types.metal){
		texture = textures.metal;
	}else if(type == CONST.types.grain){
		texture = textures.grain;
	}else if(type == CONST.types.house){
		texture = textures.house;
	}
	this.sprite = new Pixi.Sprite(texture);
	this.sprite.interactive = true;
	this.sprite.mousedown = this.onClicked;
	this.clicked = false;
}

Tile.prototype.onClicked = function(){
	this.clicked = true;
};

module.exports = Tile;
