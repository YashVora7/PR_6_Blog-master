const { Router } = require("express");
const { isAuth, check, islogin } = require("../middlewear/isAuth");
const { blogui, addblog, getblog, uiblog, blogdelete, blogupadate, singleblog, likeupdate, addcomment, blogsearch } = require("../controller/blog.contoller");
const blog = Router()

blog.get("/create",isAuth,blogui)
blog.post("/create",isAuth,check, addblog);
blog.get("/blogs",getblog)
blog.get("/",uiblog)
blog.patch("/edit/:id" , isAuth , blogupadate)
blog.delete("/delete/:id" , isAuth, blogdelete)
blog.get("/singleBlog/:id" , singleblog)
blog.patch("/like/:bid",islogin,likeupdate)
blog.patch("/comment/:bid" , islogin,addcomment)
blog.get("/search" , blogsearch)

module.exports = blog