
// A world encompasses everything. It is the abstract container of all entities.

var root = process.cwd();
var Entity = require(root + "/src/model/abstract/entity");

class World extends Entity {
	schema() {
		return Object.assign(super.schema(), {
			name: {
				presence: true
			}
		});
	}
}

module.exports = World;