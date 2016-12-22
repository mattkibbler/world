var root = process.cwd();
var _ = require("lodash");
var autoloader = require(root + "/src/lib/flat-auto-load");
var models = autoloader.load(root + '/src/model');

var loader = {
	find(key) {
		return models[key];
	}
};

module.exports = loader;
