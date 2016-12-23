var root = process.cwd();
var PhysicalEntity = require(root + "/src/model/abstract/physical-entity");
var ObjectPackage = require(root + "/src/lib/object-package");
var _ = require("lodash");

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
		return new Promise((resolve, reject) => {
			var updates = new ObjectPackage();
			// Check any needs
			// Search for ways to fulfill those needs
			// Act to fulfill needs
			updates.update(this.move({
				x: "+=1"
			}));

			if(updates.hasChanges()) {
				resolve(this.update(updates.getObject()));
			}
			else {
				resolve(null);
			}

		});
		
	}
}

module.exports = Human;