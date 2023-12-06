const express=require("express");
const router=express.Router();
const { getmessage, postmessage,deletemessage } = require("../Controller/ChatController");

router.get("/message",getmessage)
router.post("/message",postmessage)
router.post("/messagedel",deletemessage)
module.exports=router;

