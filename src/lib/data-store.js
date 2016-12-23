var mysql = require('mysql');
var root = process.cwd();
var Entity = require(root + "/src/model/abstract/entity");
var Controller = require(root + "/src/controller/controller");
var db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'mk_world'
});
db.connect();

var dataStore = {
	constructor(db) {		

	},
	get(id) {
		return new Promise((resolve, reject) => {
			db.query({
				sql: "SELECT * FROM entities WHERE id = ?",
				values: [id]
			}, function(error, results, fields){
				var result = results[0];
				resolve({
					id: result.id,
					class_name: result.class_name,
					data: JSON.parse(result.data)
				});
			});
		});		
	},
	update(id, values) {
		return new Promise((resolve, reject) => {
			db.query({
				sql: "UPDATE entities SET data = ? WHERE id = ?",
				values: [
					JSON.stringify(values),
					id
				]
			}, (error, results) => {
				if(error) {
					throw new Error("Could not updated due to database error: " + error);
				}
				else {
					resolve();
				}
			});
		});		
	}
};

module.exports = dataStore;