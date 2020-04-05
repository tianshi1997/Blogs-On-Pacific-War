var mongoose=require("mongoose");
mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true);
var passportLocalMongoose=require("passport-local-mongoose");
mongoose.connect("mongodb://localhost/pacific_war");

var UserSchema=mongoose.Schema({
    username:String,
    password:String
});

UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);
