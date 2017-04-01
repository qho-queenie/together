var requireFolder = require("./../config/req_folder.js");
var models = requireFolder("models");
var exps = {};

for(let key in models){
	exps = Object.assign(exps, models[key]);
}

module.exports = exps;