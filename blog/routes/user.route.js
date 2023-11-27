const {Router}=require("express")
const { signupui, signup, loginui, login, userDelete } = require("../controller/user.controller")
const router=Router()


router.get("/signup",signupui)
router.post("/signup",signup)
router.get("/login",loginui)
router.post("/login",login)
router.delete("/delete/:id",userDelete)

module.exports=router