var mongoose + require ('mongoose');
var UserSechema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({ email: email }).exec((error, user) => {
       if (error) {
           return callback(error);
       } else if(!user) {
           var err = new Error('User not found.');
           err.status = 401;
           return callback(err);
       } else {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result === true) {
                    return callback (null, user);
                } else {
                    return callback();
                }
            })
       }
    });
}

UserSchema.pre('save', (next) {
   var user = this;
   bcrypt.hash(user.password, 10, () => {
       if (err) {
          return next(err);
       }
       user.password = hash;
       next();
   })
});


var User = mongoose.model('User', UserSchema);
module.exports = User;