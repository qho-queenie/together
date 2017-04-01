//the following things enable this controller to access the models, and also to send html files as responses
var path = require("path");
var htmlPath = path.join(__dirname, "./../../client/");
var requireFolder = require("./../config/req_folder.js");
var models = require(path.join(__dirname, "./../config/model_combiner.js"));

//when you call a model function it should return a value (usually an array, the result of a query)
//after that you can make the response here in the controller

var groupPool = {
	//test data
	"Example Restaurant 1": {
		"7:00PM": {
			"people": [
				{name: "Chris", race: "white", gender: "male", sexuality: "heterosexual", religion: "", age: 30},
				{name: "Queenie", race: "asian", gender: "female", sexuality: "heterosexual", religion: "", age: 29},
				{name: "test1", race: "black", gender: "female", sexuality: "bisexual", religion: "christian", age: 25},
				{name: "test2", race: "hispanic", gender: "male", sexuality: "homosexual", religion: "jewish", age: 50},
				{name: "test3", race: "indian", gender: "female", sexuality: "heterosexual", religion: "hindu", age: 32},
				{name: "test4", race: "pacific islander", gender: "male", sexuality: "heterosexual", religion: "buddhist", age: 22},
				{name: "test5", race: "white", gender: "female", sexuality: "heterosexual", religion: "jewish", age: 35},
				{name: "test6", race: "native american", gender: "female", sexuality: "heterosexual", religion: "muslim", age: 40},
				{name: "test7", race: "black", gender: "female", sexuality: "heterosexual", religion: "christian", age: 33},
				{name: "test8", race: "asian", gender: "male", sexuality: "heterosexual", religion: "christian", age: 24},
				{name: "test9", race: "white", gender: "male", sexuality: "bisexual", religion: "", age: 21},
				{name: "test10", race: "asian", gender: "female", sexuality: "homosexual", religion: "", age: 28},
				{name: "extra_dood", race: "white", gender: "male", sexuality: "homosexual", religion: "", age: 60}
			]
		}
	}
};

var activeGroups = [
	//filled in by algorithm
]

var attributeWeights = {
	"race": 1,
	"gender": 1,
	"sexuality": 1,
	"religion": 1
};

//returns a score to show how different two people are
function compareIndividuals(person1, person2){
	let difference = 0;
	for(let attribute in attributeWeights){
		if(person1[attribute] !== person2[attribute])
			difference += attributeWeights[attribute];
	}
	//age works differently. each year of age difference adds 0.05 to the difference score, to a maximum of 1.
	let ageDiff = Math.abs(person1.age - person2.age)*0.05;
	if(ageDiff > 1)
		ageDiff = 1;
	return difference + ageDiff;
}

//pass the group size and a people array from the groupPool object
//splits into groups of the desired size, although size is not 100% guaranteed
function makeGroups(size, people){
	let personToGroup;
	let numGroups = ~~(people.length/size);
	let groups = new Array(~~numGroups);
	let count = 0;

	for(let i = 0; i < groups.length; i++){
		groups[i] = [];
	}

	for(let person of people){
		if(!person.grouped){
			groups[count].push(person);
			person.grouped = true;
		
			for(let personToCompare of people){
				let highScore = -1;
				let temp = 0;
				if(!personToCompare.grouped){
					temp = compareIndividuals(person, personToCompare);
					
					if(temp > highScore){
						highScore = temp;
						personToGroup = personToCompare;
					}
				}
				
			}
		
			personToGroup.grouped = true;
			groups[count].push(personToGroup);
		}
		count = (count + 1)%numGroups;
	}
	return groups;
}

module.exports = {
	test_group_algo: function(req, res){
		let result = makeGroups(4, groupPool["Example Restaurant 1"]["7:00PM"]["people"]);
		let formattedResult = {};
		let count = 0;

		for(let group of result){
			formattedResult["group"+count++] = group;
		}

		console.log(formattedResult);

		res.json(formattedResult);
	},
	test: function(req, res){
		// models.model_template.test(req, res, function(){
			res.json({ajax_test1 : "ajax_test1", ajax_test2 : "ajax_test2"});
		// });
	}
}