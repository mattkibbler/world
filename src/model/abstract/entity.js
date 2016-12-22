var root = process.cwd();
var validate = require("validate.js");
var _ = require("lodash");
var dataStore = require(root + "/src/lib/data-store");
var modelLoader = require(root + "/src/model/loader");

class Entity {
	constructor(opts) {

		// this.record holds the options/settings of the object. 
		// Each entity should be serializable by exporting as JSON so
		this.record = {};
		this.children = [];

		if(opts !== undefined) {
			// If this is a promise...
			if (typeof opts.then === "function") {
				opts.then((data) => {
					this.init(data);
				});				
			}
			else {
				this.init(opts);
			}
		}	

	}
	init(data) {
		Object.assign(this.record, data);
		this.validateSchema();		
	}
	loadChildren(){
		return new Promise((resolve, reject) => {
			var i = 0;
			var hasChildren = this.record.children !== undefined && this.record.children.length > 0;
			var childrenLoaded = 0;
			var childrenCount;
			if(hasChildren) {
				childrenCount = this.record.children.length;
				_.each(this.record.children, (childID) => {
					this.loadChild(i).then((obj) => {
						childrenLoaded += 1;						
						if(childrenLoaded === childrenCount) {
							resolve();
						}
					}).catch((reason) => {
						console.log(reason);
					});
					i += 1;
				});
			}
			else {
				resolve();
			}
		});
	}
	loadChild(index) {
		return new Promise((resolve, reject) => {
			Entity.getById(this.record.children[index]).then((obj) => {
				this.children[index] = obj;
				resolve(obj);
			});
		});
	}
	validateSchema(){
		var schema = this.schema();
		var validator;
		var result = [];
		// If schema is not an empty object...
		if(!_.isEmpty(schema)) {
			result = validate(this.record, schema);
			if(!_.isEmpty(result)) {
				_.each(result, (error) => {
					throw new Error("Hey there. You've got an entity validation error..." + error);
				});
			}
		}
	}
	schema() {
		return {
			id: {
				presence: true
			}
		};
	}
	tick() {}
	add() {

	}
	static getById(id) {
		return new Promise((resolve, reject) => {
			dataStore.get(id).then((result) => {
				var className = result.class_name;
				var modelClass = modelLoader.find(className);
				var obj = new modelClass(result.data);
				obj.className = className;
				obj.loadChildren().then(() => {
					resolve(obj);
				});				
			}).catch((reason) => {
				console.log(reason);
			});
		});		
	}
	forApi(){
		var result = _.cloneDeep(this.record);
		var children = this.children;
		var i = 0;
		result.children = [];		
		for(i = 0; i < children.length; i++) {
			result.children[i] = children[i].forApi();
		}
		result.className = this.className;
		return result;
	}
}

module.exports = Entity;