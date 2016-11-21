/**
 * Created by reuvenp on 11/6/2016.
 */
var mongo = require('mongoose');
var Schema = mongo.Schema;

var flowerSchema = new Schema({
    name: String,
    color: String,
    image_link: String,
    price: Number,
    isActive: Boolean,
    created_at: Date,
    updated_at: Date
});
flowerSchema.pre('save',function (next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});
var Flower = mongo.model('Flower', flowerSchema);
module.exports = Flower;