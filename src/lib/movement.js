var _ = require("lodash");

var movement = {
	fromTo(from, to) {
		var result;		
		// If "to" val is number, that is what we return
		if(_.isNumber(to)) {
			result = to;
		}
		else if(_.isString(to)) {
			if(to.substring(0,2) == "+=") {
				result = from + parseInt(to.substring(2));
			}
			else if(to.substring(0,2) == "-=") {
				result = from - parseInt(to.substring(2));
			}
		}
		return result;
	}
};

module.exports = movement;