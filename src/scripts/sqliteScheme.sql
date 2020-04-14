-- This is the SQLite3 database scheme which will be
-- executed on each startup to ensure that the database
-- structure is defined as below.
-- DO NOT DELETE THIS FILE.

CREATE TABLE IF NOT EXISTS `guildconfig` ( 
    `guildID` text, 
    `format` text, 
    `countBots` tinyint(1) NOT NULL DEFAULT '1' 
);