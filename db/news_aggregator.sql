DROP DATABASE IF EXISTS `news_aggregator`;

CREATE Database `news_aggregator`;
USE `news_aggregator`;

DROP TABLE IF EXISTS `rss`;
CREATE TABLE `rss` (
  `rss_id` int(10) NOT NULL AUTO_INCREMENT,
  `url` varchar(250) NOT NULL,
  `is_enabled` int(1) DEFAULT 1,
  PRIMARY KEY (`rss_id`)
);