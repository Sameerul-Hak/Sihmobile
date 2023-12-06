const mongoose = require('mongoose');

const SiteModell = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
      },
      createdAt: {
        type: Date,
        default: Date.now   ,
      },
      isCompleted:{
        type:String,
        default:false
      }

})

const SiteModel = mongoose.model('SiteModel', SiteModell);

module.exports = SiteModel;