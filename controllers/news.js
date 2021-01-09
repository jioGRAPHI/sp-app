const path = require('path');
const db = require(__dirname + '/../db_config/mysql');
const traindat = path.join(__dirname,'/../training_data/trained-net.json');

const fs = require("fs");

const Parser = require('rss-parser');
const parser = new Parser();

const natural = require('natural');
var classifier = new natural.BayesClassifier();

var list_articles = [];
var agri = [];
var aqua = [];
var nat = [];
var search = [];
var search_agri = [];
var search_aqua = [];
var search_anat = [];

exports.getRSSFeeds = (req, res)=>{
	const SEARCH_FEED = 'SELECT * FROM rss WHERE is_enabled= 1'

	db.query(SEARCH_FEED, (err, rss_url)=>{
		if(!err){
			list_articles.length = 0;
			agri.length = 0;
			aqua.length = 0;
			nat.length = 0;

			(async () => {
				for(var i = 0; i < rss_url.length; i += 1){
				
					var feed = await parser.parseURL(rss_url[i].url);
					feed.items.forEach(item => {
						list_articles.push(item);
					});
				}
				await natural.BayesClassifier.load(traindat, null, function(err, classifier) {
					for(var i = 0; i < list_articles.length; i += 1){
						var predict = classifier.classify(list_articles[i].contentSnippet)
						if(predict == 0){
							agri.push(list_articles[i]);
						}else if(predict == 1){
							aqua.push(list_articles[i]);
						}else if(predict == 2){
							nat.push(list_articles[i]);
						}else{
							continue;
						}
					}

					return res.json({
						articles: list_articles,
						agri: agri,
						aqua_res: aqua,
						nat_res: nat
					});
				});
			})();
		}
		else{
			return res.json({
				error: 'failed'
			})
		}
	})
}

// exports.searchRSSFeeds = (req, res)=>{
// 	if(!err){
// 		search.length = 0;
// 		search_agri.length = 0;
// 		search_aqua.length = 0;
// 		search_nat.length = 0;

// 		(async () => {
// 			list_articles.items.forEach(item => {
// 				trie.addString(item[i].contentSnippet);
// 				if(trie.contains(SEARCH_TERM)){
// 					search.push(item);
// 				}
// 			});


// 			await natural.BayesClassifier.load(traindat, null, function(err, classifier) {
// 				for(var i = 0; i < search.length; i += 1){
// 					var predict = classifier.classify(search[i].contentSnippet)
// 					if(predict == 0){
// 						search_agri.push(list_articles[i]);
// 					}else if(predict == 1){
// 						search_aqua.push(list_articles[i]);
// 					}else if(predict == 2){
// 						search_nat.push(list_articles[i]);
// 					}else{
// 						continue;
// 					}
// 				}

// 				return res.json({
// 					search_agri: search_agri,
// 					search_aqua: search_aqua,
// 					search_nat: search_nat,
// 				});
// 			});
// 		})();
// 	}
// 	else{
// 		return res.json({
// 			error: 'failed'
// 		})
// 	}
// }
