const fs = require("fs");

var natural = require('natural');
var classifier = new natural.BayesClassifier();

var list_articles = [];
var agri = [];
var aqua = [];
var nat = [];

var texts = [];
for (var i = 1; i < 4; i += 1){
	var filename = "td" + i.toString();
	var textFromFile = fs.readFileSync(__dirname + "/" + filename + ".txt", "utf-8");
	texts.push(textFromFile);
}

classifier.addDocument(texts[0], 0);
classifier.addDocument(texts[1], 1);
classifier.addDocument(texts[2], 2);

console.log("Classifying...");
classifier.train();

console.log("Saving training data...");
classifier.save(__dirname + '/trained-net.json', function(err, classifier) {});
console.log("Done!");