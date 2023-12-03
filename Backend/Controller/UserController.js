const User=require("../Models/UserModel")

exports.registerUser=(req,res)=>{
    const {name,phoneNumber,email,password}=req.body;

    User.create({name,phoneNumber,email,password})
    .then(()=>{
        res.json({
            message:"sucess"
        })
    }).catch((e)=>{
        res.json({
            error:e
        })
    })
}
exports.loginUser=(req,res)=>{
    const {phoneNumber,password}=req.body;
    console.log(phoneNumber,password)
    User.findOne({ phoneNumber })
        .then(user => {
            if (!user) {
                return res.json({ message: 'usernotfound' });
            }

            const isPasswordValid = password === user.password;

            if (!isPasswordValid) {
                return res.json({ message: 'password' });
            }

            res.json({ message: 'success',data:user });
        })
        .catch(error => {
            console.error(error);
            res.json({ message: 'Server error' });
        });


}