const fs = require("fs");

var natural = require('natural');
var classifier = new natural.BayesClassifier();

var list_articles = [];
var agri = [];
var aqua = [];
var nat = [];

var texts = [];
for (var i = 1; i < 10; i += 1){
	var filename = "td" + i.toString();
	var textFromFile = fs.readFileSync(__dirname + "/training_data/" + filename + ".txt", "utf-8");
	texts.push(textFromFile);
}

classifier.addDocument(texts[0], 0);
classifier.addDocument(texts[1], 0);
classifier.addDocument(texts[2], 0);
classifier.addDocument(texts[3], 1);
classifier.addDocument(texts[4], 1);
classifier.addDocument(texts[5], 1);
classifier.addDocument(texts[6], 2);
classifier.addDocument(texts[7], 2);
classifier.addDocument(texts[8], 2);

classifier.train();

// console.log(classifier.classify(texts[8]));

classifier.save(__dirname + '/training_data/trained-net.json', function(err, classifier) {});