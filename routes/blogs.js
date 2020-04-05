//=================
//Blog ROUTE
//=================

var express    =  require("express");
var router     =  express.Router();
var Blog       =  require("../models/blogs");

//show blogs

router.get("/",function(req,res){
    res.render("landing");
});

router.get("/blogs",function(req,res){
    Blog.find({},function(err,allBlogs){
       if(err){
           console.log(err);
       } else {
           res.render("blogs",{blogs:allBlogs});
       }
    });
});


router.get("/blogs/:id",function(req,res){
    Blog.findOne({_id:req.params.id}).populate("comments").exec(function(err,foundBlog){
        if(err){
            console.log(err);
        }else {
            res.render("show",{blog:foundBlog});
            //console.log(foundBlog);
        }
    })
});

router.get("/newBlogs",function(req,res){
    res.render("new");
})

router.post("/newBlogs",function(req,res){
    var  name         =   req.body.name,
         image        =   req.body.image,
         description  =   req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    Blog.create({name:name,image:image,description:description,author:author},function(err,newBlog){
        if(err){
            console.log(err);
        }else {
            res.redirect("/blogs");
        }
    });
});




router.get("/blogs/:id/edit",function(req,res){
    
        Blog.findById(req.params.id,function(err,foundBlog){
          if(err){
              console.log(err);
          }  else {
              res.render("edit",{blog:foundBlog});
          }
        });
    
});

router.put("/blogs/:id",function(req,res){
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

router.delete("/blogs/:id",checkBlogOwnership,function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else {
            res.redirect("/blogs");
        }
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");    
    
}

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

module.exports=router;
