var requireFolder = require("./../config/req_folder.js");
var controllers = requireFolder("controllers");
var exps = {};

for(let key in controllers){
	exps = Object.assign(exps, controllers[key]);
}

module.exports = exps;