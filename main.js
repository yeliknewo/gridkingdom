var Pixi = require('pixi.js');

var renderer, updateDelta, lastUpdate, gameContainer, background;

window.onload = new function(){
	renderer = Pixi.autoDetectRenderer(800, 600);
	gameContainer = new Pixi.Container();
	document.body.appendChild(renderer.view);
	
	background = new Pixi.Graphics();
	
	var bgRect = new Pixi.Rectangle(0, 0, renderer.width, renderer.height);
	background.beginFill(0xff00ff, 0xff);
	background.drawShape(bgRect);
	background.endFill();
	
	var bgCircle = new Pixi.Circle(renderer.width / 2, renderer.height / 2, Math.min(renderer.width / 2, renderer.height / 2));
	background.beginFill(0x00ff00, 0xff);
	background.drawShape(bgCircle);
	background.endFill();
	
	gameContainer.addChild(background);
	
	var updatesPerSecond = 40;
	updateDelta = 1000 / updatesPerSecond;
	lastUpdate = 0;
	
	requestAnimationFrame(run);
}

function run(timestamp){
	requestAnimationFrame(run);
	while(lastUpdate < timestamp){
		lastUpdate += updateDelta;
		update();
	}
	render();
}

function update(){
	
}

function render(){
	renderer.render(gameContainer);
}
