var Pixi = require('pixi.js'), MainMenu = require('./src/MainMenu.js'), Game = require('./src/Game.js'), Key = require('./src/Key.js');

var renderer, updateDelta, lastUpdate, gameContainer, loader, input, mainMenu, state, game;

window.onload = new function(){
	renderer = Pixi.autoDetectRenderer(800, 600);
	input = new Pixi.interaction.InteractionManager(renderer);
	input.keys = {space: new Key(32)};
	gameContainer = new Pixi.Container();
	document.body.appendChild(renderer.view);
	
	loader = new Pixi.loaders.Loader('./../assets/');
	mainMenu = new MainMenu(loader);
	state = 'load';
	
	loader.once('complete', function(){
		startMain();
		requestAnimationFrame(run);
	});
	
	var updatesPerSecond = 40;
	updateDelta = 1000 / updatesPerSecond;
	lastUpdate = 0;
}

function startMain(){
	gameContainer.addChild(mainMenu.container);
	state = 'main';
}

function endMain(){
	state = 'load';
	gameContainer.removeChild(mainMenu.container);
	mainMenu.playClicked = false;
}

function startGame(){
	if(!game){
		game = new Game(loader);
		loader.once('complete', startGame);
		state = 'load';
		return;
	}
	state = 'game';
	game.state = 'gridplace';
	gameContainer.addChild(game.container);
}

function endGame(){
	state = 'load';
	gameContainer.removeChild(game.container);
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
	if(state === 'game'){
		game.update(input);
	}else if(state === 'main'){
		mainMenu.update(input);
		if(mainMenu.playClicked){
			endMain();
			startGame();
		}
	}else if(state === 'load'){
		return;
	}
}

function render(){
	renderer.render(gameContainer);
}
