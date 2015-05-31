function Key(keyCode) {
	this.code = keyCode;
	this.isDown = false;
	this.isUp = true;
	this.press = undefined;
	this.release = undefined;
	
	this.downHandler = function(event) {
		if (event.keyCode === this.code) {
			if (this.isUp && this.press) {
				this.press();
			}
			this.isDown = true;
			this.isUp = false;
		}
		event.preventDefault();
	}.bind(this);

	this.upHandler = function(event) {
		if (event.keyCode === this.code) {
			if (this.isDown && this.release) {
				this.release();
			}
			this.isDown = false;
			this.isUp = true;
		}
		event.preventDefault();
	};

	window.addEventListener(
	"keydown", this.downHandler.bind(this), false
	);
	window.addEventListener(
	"keyup", this.upHandler.bind(this), false
	);
}

module.exports = Key;
