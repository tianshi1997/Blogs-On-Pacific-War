//==================
//Comment ROUTE
//==================
var express    =  require("express");
var router     =  express.Router();
var Blog       =  require("../models/blogs");
var Comment    =  require("../models/comments");

router.get("/blogs/:id/comments/new",isLoggedIn,function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log(err);
        }else {
            res.render("newComment",{blog:foundBlog});
        }
    });
});


router.post("/blogs/:id/comments",isLoggedIn,function(req,res){
    Blog.findById(req.params.id,function(err,blog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else {
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   console.log(err);
               }else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    console.log(comment);
                    res.redirect("/blogs/"+blog._id);
               }
           });
            
        }
    });
});

router.get("/blogs/:id/comments/:comment_id/edit",checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            console.log(err);
        }else {
            res.render("editComment",{comment:foundComment,blogid:req.params.id});
        }
    });
})


router.put("/blogs/:id/comments/:comment_id",checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,newComment){
        if(err){
            console.log(err);
        }else {
            res.redirect("/blogs/"+req.params.id);
        }
    })
});

//========================
//Destroy the comment
//========================

router.delete("/blogs/:id/comments/:comment_id",checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else {
            res.redirect("/blogs/"+req.params.id);
        }
    });
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");    
    
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

module.exports=router;
