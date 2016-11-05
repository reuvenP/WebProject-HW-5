/**
 * Created by reuvenp on 11/2/2016.
 */
var express = require('express');
var app = express();
var mongo = require('mongoose');
mongo.Promise = global.Promise;
var Schema = mongo.Schema;
var Branch = require('./DAL/branchSchema');
//var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
var db = mongo.connect('mongodb://localhost:27017/myseconddatabase');
//db.once('open', function() { console.log("Connected to DB") });
//db.on('error', function() {  console.log("Error connecting to DB") });
console.log('Pending DB connection');
/*var branch = new Branch({
    name: 'Main Branch',
    location: 'Herzl 74 Tel Aviv',
    isActive: true,
    openingHours: 'Sun - Thu, 10:00 - 17:00'
});
branch.save(function (err) {
    if (err) throw err;
    console.log('suc');
});*/
Branch.find({}, function(err, branches) {
    if (err) throw err;
    // object of all the branches
    console.log(branches);
});
//AddBranch('Second Branch', 'Hayarkon 24 Bnei Brak', 'Sun - Thu, 10:00 - 18:30');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.render('pages/index',{user:"Reuven", num_of_items:4, options:['All ', 'Ariel Ben-Ami ', 'Shmulik ']});
}).listen(3000);

function AddBranch(pname, plocation, popeningHours) {
    var branch = new Branch({
        name: pname,
        location: plocation,
        isActive: true,
        openingHours: popeningHours
    });
    branch.save(function (err) {
        if (err) throw err;
        console.log('branch saved');
    });
}