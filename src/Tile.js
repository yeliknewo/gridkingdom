var Pixi = require('pixi.js'), CONST = require('./Const.js');

function Tile(type, owner, textures, rotation){
	this.onClicked = this.onClicked.bind(this);
	
	this.container = new Pixi.Container();
	this.container.interactive = true;
	this.container.mousedown = this.onClicked;
	
	this.owner = owner;
	this.spriteGrid = new Pixi.Sprite(textures[this.owner]);
	this.container.addChild(this.spriteGrid);
	
	this.type = type;
	this.rotation = rotation;
	
	this.spriteRes = new Pixi.Sprite(textures[this.type]);
	this.spriteRes.rotation = rotation;
	this.spriteRes.anchor.set(0.5, 0.5);
	this.spriteRes.position.set(this.spriteGrid.width / 2, this.spriteGrid.height / 2);
	this.container.addChild(this.spriteRes);
	
	this.clicked = false;
}

Tile.prototype.onClicked = function(){
	this.clicked = true;
};

module.exports = Tile;
