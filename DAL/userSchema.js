/**
 * Created by reuvenp on 11/5/2016.
 */
var mongo = require('mongoose');
var Schema = mongo.Schema;

var Permission = {
    CUSTOMER: 0,
    SUPPLIER: 1,
    EMPLOYEE: 2,
    MANAGER: 3
};

var userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permission: {type: Number, required: true, minimum: 0, maximum:3},
    isActive: Boolean,
    meta: {
        birthday: Date,
        website: String
    },
    branch_number: Number,
    created_at: Date,
    updated_at: Date
});

userSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

var User = mongo.model('User', userSchema);
module.exports = User;
module.exports.permission = Permission;

