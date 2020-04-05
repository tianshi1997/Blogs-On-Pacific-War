//==========
//Library
//==========
var    express         =   require('express'),
       app             =   express(),
       mongoose        =   require('mongoose'),
       bodyParser      =   require('body-parser'),
       methodOverride  =   require('method-override'),
       passport        =   require('passport'),
       LocalStrategy   =   require('passport-local');
       

mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/pacific_war");

var   blogRoutes      =   require("./routes/blogs"),
      commentRoutes   =   require("./routes/comments"),
      indexRoutes     =   require("./routes/index");


var   Blog      =    require("./models/blogs"),
      Comment   =    require("./models/comments"),
      User      =    require("./models/users"),
      seedDB    =    require("./seeds");

//seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});


//=================
//Passport
//=================

app.use(require("express-session")({
    secret:"1208",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});

app.use(blogRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server started");
});
/*
//=================
//Blog ROUTE
//=================


app.get("/",function(req,res){
    res.render("landing");
});

app.get("/blogs",function(req,res){
    Blog.find({},function(err,allBlogs){
       if(err){
           console.log(err);
       } else {
           res.render("blogs",{blogs:allBlogs});
       }
    });
});

app.get("/blogs/:id",function(req,res){
    Blog.findOne({_id:req.params.id}).populate("comments").exec(function(err,foundBlog){
        if(err){
            console.log(err);
        }else {
            res.render("show",{blog:foundBlog});
            //console.log(foundBlog);
        }
    })
})

app.get("/newBlogs",function(req,res){
    res.render("new");
})

app.post("/newBlogs",function(req,res){
    var  name         =   req.body.name,
         image        =   req.body.image,
         description  =   req.body.description;
    
    Blog.create({name:name,image:image,description:description},function(err,newBlog){
        if(err){
            console.log(err);
        }else {
            res.redirect("/blogs");
        }
    });
});


app.get("/blogs/:id/edit",function(req,res){
    Blog.findOne({_id:req.params.id}).populate("comments").exec(function(err,foundBlog){
        if(err){
            console.log(err);
        } else {
            res.render("edit",{blog:foundBlog});
        }
    });
    
});

app.put("/blogs/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            console.log(err);
        }else {
            res.redirect("/blogs/"+req.params.id);
        }
    });
});


//================
//Destroy Blog
//================

app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else {
            res.redirect("/blogs");
        }
    });
});
*/

//==================
//Comment ROUTE
//==================
/*
app.get("/blogs/:id/comments/new",isLoggedIn,function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log(err);
        }else {
            res.render("newComment",{blog:foundBlog});
        }
    });
});

app.post("/blogs/:id/comments",isLoggedIn,function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else {
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   console.log(err);
               }else{
                   foundBlog.comments.push(comment);
                   foundBlog.save();
                   res.redirect("/blogs/"+foundBlog._id);
               }
           });
            
        }
    });
});

app.get("/blogs/:id/comments/:comment_id/edit",function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            console.log(err);
        }else {
            res.render("editComment",{comment:foundComment,blogid:req.params.id});
        }
    });
})


app.put("/blogs/:id/comments/:comment_id",function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,newComment){
        if(err){
            console.log(err);
        }else {
            res.redirect("/blogs/"+req.params.id);
        }
    })
});
*/



//==============
//Auth ROUTE
//==============
/*

app.get("/register",function(req,res){
    res.render("register");
})

app.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
        }else {
            passport.authenticate("local")(req,res,function(){
               res.redirect("/blogs"); 
            });
        }
    })
})

app.get("/login",function(req,res){
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/blogs",
    failureRedirect:"/login"
}),function(req,res){
    
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/blogs");
})
*/

//============
//middleware
//============

/*
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");    
    
}
*/

/*
function checkBlogOwnership(req,res,next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id,function(err,foundBlog){
            if(err){
                console.log(err);
            }else {
                res.redirect("back");
            }
        });
    }else {
        res.redirect("back");
    }
}



function checkCommentOwnership(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                console.log(err);
            }else {
                if(foundComment.author.id.equals(req.user.id))
                {
                    next();
                }else {
                    res.redirect("back");
                }
            }
        });
    }else {
        res.redirect("back");
    }
}
*/


