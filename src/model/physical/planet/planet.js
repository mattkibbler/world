var root = process.cwd();
var Entity = require(root + "/src/model/abstract/entity");

class Planet extends Entity {
	constructor(opts) {
		super(opts);	
	}
	schema() {
		return Object.assign(super.schema(), {
			name: {
				presence: true
			},
		    size: {
		    	presence: true
		    }
		});
	}
}

module.exports = Planet;