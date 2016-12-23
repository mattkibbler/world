
// A world encompasses everything. It is the abstract container of all entities.

var root = process.cwd();
var Entity = require(root + "/src/model/abstract/entity");
var Movement = require(root + "/src/lib/movement.js");
var _ = require("lodash");

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
	/**
	 * Update entity position
	 * @return {[type]} [description]
	 */
	move(moveTo){

		var now = Date.now();
		var x;
		var y;		
		var changes = {};
		var shouldMove = false;

		if(
			this._timeLastMoved === null ||
			((now - this._timeLastMoved) > this.moveSpeed())
		) {

			if(moveTo.x) {
				x = Movement.fromTo(this.record.position.x, moveTo.x);
				if(x !== this.record.position.x) {
					changes.x = x;
					shouldMove = true;
				}
			}
			if(moveTo.y) {
				y = Movement.fromTo(this.record.position.y, moveTo.y);
				if(y !== this.record.position.y) {
					changes.y = y;
					shouldMove = true;
				}
			}	

			this._timeLastMoved = now;

			if(shouldMove) {
				return {
					position: changes
				};
			}	

			return null;		

		}
	}
}

module.exports = PhysicalEntity;