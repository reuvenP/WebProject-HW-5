/**
 * Created by reuvenp on 11/2/2016.
 */
var express = require('express');
var app = express();
var mongo = require('mongoose');
mongo.Promise = global.Promise;
var Schema = mongo.Schema;
var Branch = require('./DAL/branchSchema');
var User = require('./DAL/userSchema');
var Flower = require('./DAL/flowerSchema');
var Permission = User.permission;
//var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
var db = mongo.connect('mongodb://localhost:27017/myseconddatabase');
//db.once('open', function() { console.log("Connected to DB") });
//db.on('error', function() {  console.log("Error connecting to DB") });
console.log('Pending DB connection');
Branch.find({}, function(err, branches) {
    if (err) throw err;
    // object of all the branches
    console.log(branches);
});
User.find({}, function(err, users) {
    if (err) throw err;
    // object of all the branches
    console.log(users);
});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.render('pages/index',{user:"Reuven", num_of_items:4, options:['All ', 'Ariel Ben-Ami ', 'Shmulik ']});
}).listen(3000);

function AddBranch(pname, pnumber, plocation, popeningHours) {
    var branch = new Branch({
        name: pname,
        number: pnumber,
        location: plocation,
        isActive: true,
        openingHours: popeningHours
    });
    branch.save(function (err) {
        if (err) throw err;
        console.log('branch saved');
    });
}

function UpdateBranch(branch_new) {
    Branch.findById(branch_new._id, function (err, branch) {
        if (err) throw err;
        branch.name = branch_new.name;
        branch.location = branch_new.location;
        branch.isActive = branch_new.isActive;
        branch.openingHours = branch_new.openingHours;
        branch.number = branch_new.number;
        branch.save(function (err) {
            if (err) throw err;
            console.log('branch updated');
        });
    });
}

function DeleteBranch(branch) {
    branch.isActive = false;
    UpdateBranch(branch);
}

function AddUser(pname, pusername, ppassword, ppermission, pbirthday, pwebsite, pbranch_number) {
    var user = new User({
        name: pname,
        username: pusername,
        password: ppassword,
        permission: ppermission,
        isActive: true,
        meta: {birthday: pbirthday,
            website: pwebsite},
        branch_number: pbranch_number
    });
    user.save(function (err) {
        if (err) throw err;
        console.log('user saved');
    });
}

