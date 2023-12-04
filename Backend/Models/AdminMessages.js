const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
      },
    message:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now   ,
      },
    isAdmin:{
      type:Boolean,
      default:false
    }
})

const AdminMessage = mongoose.model('AdminMessage', messageSchema);

module.exports = AdminMessage;