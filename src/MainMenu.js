var Pixi = require('pixi.js');

function MainMenu(loader){
	this.loader = loader;
	this.container = new Pixi.Container();
	this.onProgress = this.onProgress.bind(this);
	this.onLoaded = this.onLoaded.bind(this);
	this.playClick = this.playClick.bind(this);
	this.loader.add('mainmenubackground', 'mainmenubackground.png')
	.add('playbutton', 'playbutton.png')
	.on('onProgress', this.onProgress)
	.load(this.onLoaded);
	this.selectedFilter = new Pixi.filters.ColorMatrixFilter();
	this.selectedFilter.brightness(.6, false);
	this.playClicked = false;
}

MainMenu.prototype.playClick = function(){
	this.playClicked = true;
};

MainMenu.prototype.onProgress = function(event){
	console.log('Main loading: ' + event.progress);
};

MainMenu.prototype.onLoaded = function(loader, resources){
	this.background = new Pixi.Sprite(resources.mainmenubackground.texture);
	this.container.addChild(this.background);
	
	this.play = new Pixi.Sprite(resources.playbutton.texture);
	this.play.position.set(this.background.width / 4, this.background.height * 3 / 4);
	this.play.anchor.set(0.5, 0.5);
	this.play.interactive = true;
	this.play.mousedown = this.playClick;
	this.container.addChild(this.play);
};

MainMenu.prototype.update = function(input){
	if(this.play.containsPoint(input.mouse.global)){
		this.play.filters = [this.selectedFilter];
	}else if(this.play.filters){
		this.play.filters = null;
	}
};

module.exports = MainMenu;
