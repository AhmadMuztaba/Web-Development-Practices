const User=require('../models/user');
const jwt=require('jsonwebtoken');
const auth=async(req,res,next)=>{
    try{
    const token=req.header('Authorization').replace('Bearer ','');
    const decoded=await jwt.decode(token,'thisIsAKabab');
    const user=await User.findOne({_id:decoded._id,'tokens.token':token});
    if(!user){
        throw new Error('Authorization failed');
    }
    req.token=token;
    req.user=user;
    next();
}catch(e){
    res.status(400).send(e.message);
}
}
module.exports=auth;