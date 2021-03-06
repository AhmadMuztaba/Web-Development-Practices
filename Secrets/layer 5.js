//jshint esversion:6
// require('dotenv').config();
const express=require('express');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require('mongoose');
const session = require('express-session');
const passport=require('passport');
const passportLocalMongoose=require('passport-local-mongoose');

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));

app.use(session({
   secret: "this is our little secret",
   resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true,useUnifiedTopology: true });
mongoose.set("useCreateIndex",true);

const UserSchema=new mongoose.Schema({
  username:String,
  password:String,
});
UserSchema.plugin(passportLocalMongoose);


const User=mongoose.model("User",UserSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
  res.render("home");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});

app.get("/secrets",function(req,res){
  if(req.isAuthenticated()){
    res.render("secrets");
  }else{
    res.render("login");
  }
});

app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
});

app.post("/register",function(req,res){
User.register({username:req.body.username},req.body.password,function(err,user){
  if(err){
    console.log(err);
    res.redirect("/register");
  }else{
    passport.authenticate("local")(req,res,function(){
      res.redirect("/secrets");
    });
  }
});
});


app.post("/login",function(req,res){
  const user=new User({
    username:req.body.username,
    password:req.body.password
  });
  req.login(user,function(err){
  if(err){
    console.log(err);
  }else{
        passport.authenticate("local")(req,res,function(){
        res.redirect("/secrets");
    });
  }
});

});
app.listen(3000||process.env.port,function(req,res){
  console.log("connected to 3000");
});
