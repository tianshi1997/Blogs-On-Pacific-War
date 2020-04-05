var mongoose=require("mongoose");
mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/pacific_war");

var BlogSchema=mongoose.Schema({
    name:String,
    image:String,
    description:String,
    author:{
        id:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Comment"
        }
        ]
});

module.exports=mongoose.model("Blog",BlogSchema);
