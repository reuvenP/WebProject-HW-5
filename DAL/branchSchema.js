/**
 * Created by reuvenp on 11/5/2016.
 */
var mongo = require('mongoose');
var Schema = mongo.Schema;

var branchSchema = new Schema({
    name: String,
    location: String,
    isActive: Boolean,
    openingHours: String,
    created_at: Date,
    updated_at: Date
});
branchSchema.pre('save',function (next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});
var Branch = mongo.model('Branch', branchSchema);
module.exports = Branch;