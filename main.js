var Pixi = require('pixi.js');

var renderer, updateDelta, lastUpdate, gameContainer, loader, eyebackground, pupil, pupilOrigin, input;

window.onload = new function(){
	renderer = Pixi.autoDetectRenderer(800, 600);
	input = new Pixi.interaction.InteractionManager(renderer);
	gameContainer = new Pixi.Container();
	document.body.appendChild(renderer.view);
	pupilOrigin = new Pixi.Point(renderer.width / 2, renderer.height / 2);
	
	loader = new Pixi.loaders.Loader('./../assets/');
	loader.add('eyebackground', 'eyebackground.png').add('pupil', 'pupil.png').load(function(loader, resources){
		
		eyebackground = new Pixi.Sprite(resources.eyebackground.texture);
		gameContainer.addChild(eyebackground);
		
		pupil = new Pixi.Sprite(resources.pupil.texture);
		pupil.anchor = new Pixi.Point(.5, .5);
		gameContainer.addChild(pupil);
			
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
	pupil.position.set(pupilOrigin.x + (input.mouse.global.x - pupilOrigin.x) / 2, pupilOrigin.y + (input.mouse.global.y - pupilOrigin.y) / 2);
}

function render(){
	renderer.render(gameContainer);
}
