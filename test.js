const Low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

var db = Low(new FileSync('localdb.json'));
db.set("guild.172389712398172389.test", {a: 1, b:2}).write();
console.log(db.get("guild.172389712398172389.test.a").value());