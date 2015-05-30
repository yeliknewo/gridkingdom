var Pixi = require('pixi.js');
var MainMenu = require('./src/MainMenu.js');

var renderer, updateDelta, lastUpdate, gameContainer, loader, input, mainmenubackground, playbutton;

window.onload = new function(){
	renderer = Pixi.autoDetectRenderer(800, 600);
	input = new Pixi.interaction.InteractionManager(renderer);
	gameContainer = new Pixi.Container();
	document.body.appendChild(renderer.view);
	loader = new Pixi.loaders.Loader('./../assets/');
	mainmenu = MainMenu(loader);
	
	loader.once('complete', function(){
		requestAnimationFrame(run);
	});
	
	var updatesPerSecond = 40;
	updateDelta = 1000 / updatesPerSecond;
	lastUpdate = 0;
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
