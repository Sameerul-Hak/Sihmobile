const express = require('express');
const router = express.Router();
const { getAllMessages, postMessage } = require('../Controller/Adminmsgcontroller');

// For posting a message
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
  
module.exports = router;
