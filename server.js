/**
 * Created by reuvenp on 11/2/2016.
 */
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.render('pages/index',{user:"Reuven", num_of_items:4, options:['All ', 'fl1 ', 'fl2 ']});
}).listen(3000);