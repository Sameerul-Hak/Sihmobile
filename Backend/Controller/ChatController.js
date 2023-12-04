const Message=require("../Models/ChatModel")

exports.getmessage=(req,res)=>{
    Message.find().then((msg)=>{
        res.status(201).json({msg})
    }).catch((e)=>{
        console.log(e);
        res.status(401).json({message:"error vanthuruchu"})
    })
}
exports.postmessage=(req,res)=>{
    const { name, message } = req.body;
    Message.create({
        name,message,"createdAt":new Date()
    }).then(()=>{
        res.json({
            message:"sucess"
        })
    }).catch((e)=>{
        res.json({
            error:e
        })
    })
}
exports.deletemessage=(req,res)=>{
    const {message} =req.body;
    Message.deleteOne({
        message
    }).then(()=>{
        res.json({
            message:"sucess"
        })
    }).catch((e)=>{
        res.json({
            error:e
        })
    })
}