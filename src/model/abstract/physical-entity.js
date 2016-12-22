
// A world encompasses everything. It is the abstract container of all entities.

var root = process.cwd();
var Entity = require(root + "/src/model/abstract/entity");

class PhysicalEntity extends Entity {
	constructor(opts) {
		super(opts);
		this._timeLastMoved = null;
	}
	schema() {
		return Object.assign(super.schema(), {
			position: {
				presence: true
			},
			"position.x": {
				presence: true
			},
			"position.y": {
				presence: true
			}
		});
	}
	/**
	 * How fast in ms this entity can move
	 * @return {Number} Speed in ms
	 */
	moveSpeed(){
		return 2000;
	}
	move(){
		var now = Date.now();
		//console.log(now);
		if(
			this._timeLastMoved === null ||
			((now - this._timeLastMoved) > this.moveSpeed())
		) {
			console.log("move");
			this._timeLastMoved = now;
		}
	}
}

module.exports = PhysicalEntity;