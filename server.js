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
var cookieParser = require('cookie-parser');
var Permission = User.permission;
//var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
var db = mongo.connect('mongodb://localhost:27017/myseconddatabase');
//db.once('open', function() { console.log("Connected to DB") });
//db.on('error', function() {  console.log("Error connecting to DB") });

/*
AddBranch('Siaglit', 1, 'Sigalit 1 Rishon Leziyon', '08:00-19:00');
AddBranch('Nurit', 2, 'Nurit 2 Jerusalem', '08:00-19:00');

AddUser("Moshe Levi", 'moshe', '1234', 2, new Date('1981-01-01'), 'google.com', 1);
AddUser("Yossi Cohen", 'yossi', '1234', 2, new Date('1982-02-02'), 'yahoo.com', 1);
AddUser("Noam Buzaglo", 'noam', '1234', 3, new Date('1983-03-03'), 'youtube.com', 1);

AddUser("Avi Biton", 'avi', '1234', 2, new Date('1984-04-04'), 'microsoft.com', 2);
AddUser("Daniel Friedman", 'daniel', '1234', 2, new Date('1985-05-05'), 'facebook.com', 2);
AddUser("David Bergman", 'david', '1234', 3, new Date('1986-06-06'), 'twitter.com', 2);

AddUser("Itay Maor", 'itay', '1234', 0, new Date('1987-07-07'), 'flickr.com', null);
AddUser("Yehuda Dayan", 'yehuda', '1234', 0, new Date('1988-08-08'), 'alibaba.com', null);
AddUser("Moishe Ufnik", 'moishe', '1234', 0, new Date('1989-09-09'), 'aliexpress.com', null);
AddUser("Kipy Ben-Kipod", 'kipy', '1234', 0, new Date('1990-10-10'), 'ebay.com', null);

AddBranch('Narkis', 3, 'Narkis 3 TLV', '08:00-19:00');
AddBranch('Havazelet', 4, 'Havazelet 4 Naarya', '08:00-19:00');
AddBranch('Yakinton', 5, 'Yakinton 5 Petah Tikva', '08:00-19:00');
AddBranch('Vered', 6, 'Vered 6 Eilat', '08:00-19:00');
AddBranch('Rakefet', 7, 'Rakefet 7 Ashdod', '08:00-19:00');
*/

console.log('Pending DB connection');

/*User.find({}, function(err, users) {
    if (err) throw err;
    // object of all the branches
    console.log(users);
});*/

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.get('/', function (req, res) {
    //userID = mongo.Types.ObjectId('583179b55823d22d60b31cd1');
    userID = req.cookies['userID'];
        User.findById(userID, function (err, user) {if (err) throw err;
        if (!user) {
            //res.cookie('userID', '583179b55823d22d60b31cd1');
            res.render('pages/index', {user: null, options: ['All ', 'Ariel Ben-Ami ', 'Shmulik ']});
        }
        else {
            res.render('pages/index', {user: user, options: ['All ', 'Ariel Ben-Ami ', 'Shmulik ']});
        }

    })
});

app.get('/login', function (req, res) {
    User.find({username:req.query.username, password:req.query.password}, function (err, user) {
        if (err) throw err;
        if (user.length == 1){
            res.cookie('userID', user[0]._id);
            res.redirect("/");
        }
    });
});

app.get('/getBranches', function (req, res) {
    Branch.find({}, function(err, branches) {
        if (err) throw err;
        // object of all the branches
        res.json(branches);
    });
});

app.listen(3000);

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

