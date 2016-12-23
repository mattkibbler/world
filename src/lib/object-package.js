var root = process.cwd();

var _ = require("lodash");

class ObjectPackage {
	constructor(){
		this.obj = {};
	}
	update(changes) {
		_.merge(this.obj, changes);
	}
	hasChanges(){
		return !_.isEmpty(this.obj);
	}
	getObject() {
		return this.obj;
	}
}

module.exports = ObjectPackage;