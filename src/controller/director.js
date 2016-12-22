var root = process.cwd();
var Controller = require(root + "/src/controller/controller");
var gameloop = require("node-gameloop");
var _ = require("lodash");

class Director extends Controller {
	constructor(props){
		super(props);
		Object.assign(this, props);
	}
	startLoop() {		
		if(this.loopID) {
			return false;
		}
		var frameCount = 0;
		this.loopID = gameloop.setGameLoop((delta) => {
		    // `delta` is the delta time from the last frame
		    this.direct(this.world);
		    this.io.sockets.emit('frame', frameCount++);
		}, 1000 / 30);
	}
	direct(obj) {
		obj.tick();
		_.each(obj.children, (child) => {
			this.direct(child);
		});
	}
}

module.exports = Director;