const AdminMessage = require('../Models/AdminMessages'); // Import your AdminMessage model

// Method to post a message
const postMessage = async (userId, messageContent) => {
  try {
    const newMessage = new AdminMessage({
      user: userId, 
      message: messageContent,
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
      const messages = await AdminMessage.find({ user: userId }).populate('user', 'name').select('user message createdAt');
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  };
  
  
  
module.exports = { postMessage, getAllMessages }; // Export both functions together
