const express = require('express');
const router = express.Router();
const { getAllMessages, postMessage,userpostadmin,getAllMessagesforadmin, deletemsgfromuser } = require('../Controller/Adminmsgcontroller');

// For posting a message from admin to user
router.post('/postmessage', async (req, res) => {
  try {
    const savedMessage = await postMessage(req.body.user, req.body.message);
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// For getting all messages
router.get('/getmessage/:userid', async (req, res) => {
    const { userid } = req.params;
    console.log(userid); // Extract userId from request parameters
    try {
      const messages = await getAllMessages(userid); // Pass userId to getAllMessages function
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
//user post panrathuku eethu
router.post("/userpostadmin",userpostadmin);
router.get("/msgforadmin",getAllMessagesforadmin);
router.post("/deletemsgfromuser",deletemsgfromuser);
module.exports = router;


// http://localhost:8000/a/postmessage
// {
//   "user":"656c38ed84fd0029d6313ccf",
//   "message":"sample test admin message 2"

// }