/**
 * Created by reuvenp on 11/2/2016.
 */
var express = require('express');
var app = express();
var mongo = require('mongoose');
var Schema = mongo.Schema;
var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() {  console.log("Error connecting to DB") });
console.log('Pending DB connection');
var categorySchema = new Schema({
    name: String
});
var Category = db.model('Category',categorySchema);
module.exports = Category;
/*var cat = new Category({
    name:'ABA'
});
cat.save(function (err) {
    if (err) throw err;
    console.log('su');
});*/
Category.find({}, function (err, categories) {
    if (err) throw err;
    console.log(categories);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.render('pages/index',{user:"Reuven", num_of_items:4, options:['All ', 'Ariel Ben-Ami ', 'Shmulik ']});
}).listen(3000);