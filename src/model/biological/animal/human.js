var root = process.cwd();
var PhysicalEntity = require(root + "/src/model/abstract/physical-entity");

class Human extends PhysicalEntity {
	constructor(opts) {
		super(opts);
	}
	schema() {
		return Object.assign(super.schema(), {
			name: {
				presence: true
			}
		});
	}
	tick() {
		this.move();
		//console.log("human tick")
	}
}

module.exports = Human;