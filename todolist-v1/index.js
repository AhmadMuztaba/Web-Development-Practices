const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
let userIns=[];
let worlist=[];
app.use(express.static("public"));
app.get("/",function(req,res) {
    let day=date.tDate();
    res.render("list",{newDay:day,items:userIns});
})
app.post("/",function (req,res) {

    let userIn=req.body.userItem;
    let buttonValue=req.body.button
    if(userIn==""){
        res.redirect("/");
    }
    else {
        if(req.body.submit=="Worklist"){
            worlist.push(userIn);
            res.redirect("/work");
        }
        else
        {
            userIns.push(userIn);
            res.redirect("/");
        }
    }
});
app.get("/work",function (req,res) {
    res.render("list",{newDay: "Worklist",items:worlist});
})
app.post("/work",function (req,res) {
    let workInP=req.body.userItem;
    worlist.push(workInP);
    res.redirect("/work");
})
app.get("/about",function(req,res) {
    res.render("about");
})
app.listen(process.env.PORT||3000,function () {
    console.log("server connected");
})
