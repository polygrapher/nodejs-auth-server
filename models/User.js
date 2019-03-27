const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});

// On save hook, encrypt password, avoid using arrow function cause it breaks context of the model
userSchema.pre('save', function(next) {
    // Generate salt and then run callback
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        // Hash (encrypt) our password using previously generated salt
        bcrypt.hash(this.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }

            // Overwrite plain text password with hashed one
            this.password = hash;
            next();
        })
    })
});

// Custom instance methods
userSchema.methods.comparePasswords = function(candidatePassword, callback) {
    return bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err)
        }

        callback(null, isMatch);
    });
};

// Name of the model will correspond to the mongodb collection name
const model = mongoose.model('user', userSchema);

module.exports = model;