const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Task=require('./task');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        unique:true,
        type:String,
        required:true,
        validate(value){
         if(!validator.isEmail(value)){
             throw new Error('not a valid email');
         }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('you cant use this password');
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }
    ],
    avatar:{
        type:Buffer,
    }
},{
    timestamps:true
});
userSchema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.virtual('tasks',{
    ref:"Task",
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.getAuthToken=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id.toString()},'thisIsAKabab');
    user.tokens=user.tokens.concat({token});
    user.save();
    return token;
}
userSchema.statics.findByCredential=async(email,password)=>{
  const user=await User.findOne({email});
  if(!user){
      throw new Error('cant login');
  }
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch){
    throw new Error('cant login ');
  }
  return user;
}
userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8);
    }
    next();
});
userSchema.pre('remove',async function(next){
    const user=this;
    await Task.deleteMany({owner:user._id});
    next();
})
const User=mongoose.model('User',userSchema);

module.exports=User;