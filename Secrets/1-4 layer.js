//jshint esversion:6
// require('dotenv').config();
const express=require('express');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const saltRounds=10;
// const md5=require('md5');
// const encrypt=require("mongoose-encryption");

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true,useUnifiedTopology: true });

const UserSchema=new mongoose.Schema({
  name:String,
  password:String,
});


// UserSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:['password']});
const User=mongoose.model("User",UserSchema);

app.get("/",function(req,res){
  res.render("home");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register",function(req,res){
  const username=req.body.username;
  const userpassword=req.body.password;

  bcrypt.hash(userpassword, saltRounds, function(err, hash) {
    const newUser=new User({
      name:username,
      password:hash,
    });
    newUser.save(function(err){
      if(err){
        res.send(err);
      }else{
        res.render("secrets");
      }
    });
  });

});


app.post("/login",function(req,res){
  const username=req.body.username;
  const userpassword=req.body.password;
  User.findOne({name:username},function(err, result){
       if(err){
          res.send(err);
       }else{
         if(result){
         bcrypt.compare(userpassword, result.password, function(err, found) {
           if(found===true){
              res.render("secrets");
           }
});
}

     }
  });
});
app.listen(3000||process.env.port,function(req,res){
  console.log("connected to 3000");
});
