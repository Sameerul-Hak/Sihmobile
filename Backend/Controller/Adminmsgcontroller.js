const AdminMessage = require('../Models/AdminMessages'); // Import your AdminMessage model

// Method to post a message
const postMessage = async (userId, messageContent) => {
  try {
    const newMessage = new AdminMessage({
      user: userId, 
      message: messageContent,
      isAdmin:true,
    });
    const savedMessage = await newMessage.save();
    return savedMessage;
  } catch (error) {
    console.error('Error posting message:', error);
    throw new Error('Failed to post message');
  }
};

// Method to get all messages
const getAllMessages = async (userId) => {
    try {
      const messages = await AdminMessage.find({ user: userId,isAdmin:true }).populate('user', 'name').select('user message createdAt');
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  };
  
  const userpostadmin=async (req,res)=>{
    console.log(req.body.user,req.body.message);
    try {
      const newMessage = new AdminMessage({
        user: req.body.user, 
        message: req.body.message,
        isAdmin:false,
      });
      const savedMessage = await newMessage.save();
      return res.status(200).json(savedMessage);
    } catch (error) {
      console.error('Error posting message:', error);
      throw new Error('Failed to post message');
    }
  }
  const getAllMessagesforadmin = async (req,res) => {
    try {
      const messages = await AdminMessage.find({ isAdmin:false });
      return res.status(200).json(messages);
    } catch (error) {
      
    }
  };
  const deletemsgfromuser = async (req, res) => {
    try {
      const { userid, messageid } = req.body;
  
      const message = await AdminMessage.findOneAndDelete({ user: userid, _id: messageid });
  
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      return res.status(200).json({ message: 'Message deleted' });
    } catch (error) {
      console.error('Error deleting messages:', error);
      return res.status(500).json({ error: 'Failed to delete message' });
    }
  };
module.exports = { postMessage, getAllMessages,getAllMessagesforadmin ,userpostadmin,deletemsgfromuser}; 
