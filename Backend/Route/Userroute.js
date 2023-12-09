const express=require("express")
const {registerUser, loginUser, getalluser} =require("../Controller/UserController")
const router=express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/alluser",getalluser)


module.exports=router;