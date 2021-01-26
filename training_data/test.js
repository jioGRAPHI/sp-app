const fs = require("fs");

var natural = require('natural');
var classifier = new natural.BayesClassifier();

const path = require('path');
const traindat = path.join(__dirname,'/../training_data/trained-net.json');

// console.log(traindat);

var texts_agri = [];
var texts_nat = [];
var texts_aqua = [];
var agri = 0;
var nat = 0;
var aqua = 0;

(async () => {
	for (var i = 1; i < 26; i += 1){
		var filename = "agri" + i.toString();
		var textFromFile = fs.readFileSync(__dirname + "/test_cases/" + filename + ".txt", "utf-8");
		texts_agri.push(textFromFile);
	}

	await natural.BayesClassifier.load(traindat, null, function(err, classifier) {
		console.log("Testing Agriculture category...");
		for(var i = 0; i < texts_agri.length; i += 1){
			var predict = classifier.classify(texts_agri[i])
			if(predict == 0){
				agri = agri + 1;
			}else{
				continue;
			}
		}
		console.log("Agri: "+ agri + "/25")
		fs.writeFile(__dirname + "/test_cases_output/res_agri.txt", "Result: " + agri + "/25 classified correctly", function (err) {
			if (err) return console.log(err);
		});
	});

	for (var i = 1; i < 26; i += 1){
		var filename = "aqua" + i.toString();
		var textFromFile = fs.readFileSync(__dirname + "/test_cases/" + filename + ".txt", "utf-8");
		texts_aqua.push(textFromFile);
	}

	await natural.BayesClassifier.load(traindat, null, function(err, classifier) {
		console.log("Testing Aquatic Resources category...");
		for(var i = 0; i < texts_aqua.length; i += 1){
			var predict = classifier.classify(texts_aqua[i])
			if(predict == 1){
				aqua = aqua + 1;
			}else{
				continue;
			}
		}
		console.log("Aqua: "+ aqua + "/25")
		fs.writeFile(__dirname + "/test_cases_output/res_aqua.txt", "Result: " + aqua + "/25 classified correctly", function (err) {
			if (err) return console.log(err);
		});
	});

	for (var i = 1; i < 26; i += 1){
		var filename = "nat" + i.toString();
		var textFromFile = fs.readFileSync(__dirname + "/test_cases/" + filename + ".txt", "utf-8");
		texts_nat.push(textFromFile);
	}

	await natural.BayesClassifier.load(traindat, null, function(err, classifier) {
		console.log("Testing Natural Resources category...");
		for(var i = 0; i < texts_nat.length; i += 1){
			var predict = classifier.classify(texts_nat[i])
			if(predict == 2){
				nat = nat + 1;
			}else{
				continue;
			}
		}
		console.log("Nat: "+ nat + "/25")
		fs.writeFile(__dirname + "/test_cases_output/res_nat.txt", "Result: " + nat + "/25 classified correctly", function (err) {
			if (err) return console.log(err);
		});
	});
})();
