//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");

const mongoose=require('mongoose');
const app = express();

const _ = require('lodash');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});

const itemSchema={
  name:String,
};
const Item=mongoose.model("item",itemSchema);

const item1=new Item({
  name:"welcome to our todo list",
});
const item2=new Item({
  name:"hit the + item to add new item",
});
const item3=new Item({
  name:"<-- hit this to delete an item",
});
const defaultItem=[item1,item2,item3];

const listSchema={
  name:String,
  item:[itemSchema],
};
const List=mongoose.model("list",listSchema);

app.get("/", function(req, res) {
              Item.find({},function(err,foundItem){
                                   if(foundItem.length===0){
                                       Item.insertMany(defaultItem,function(err){
                                                            if(err){
                                                                    console.log(err);
                                                                   }
                                                              else{
                                                                    console.log("successfully added to our database");
                                                                      res.redirect("/");
                                                                 }
                                                           });
                                                }
                                    else{
                                            if(err){
                                                    console.log(err);
                                                   }
                                             else{
                                                     res.render("list", {listTitle: "Today", newListItems: foundItem});
                                                  }
                                        }
                   });
// const day = date.getDate();
});

app.post("/delete",function(req,res){
  const Id=req.body.checkbox;
  const listti=req.body.listName;
  if(listti==="Today"){
      Item.findByIdAndRemove(Id,function(err){
           if(err){
               console.log(err);
                 }
            else{
              console.log("removed successfully");
              res.redirect("/");
               }
               });
}
else{
  List.findOneAndUpdate({name:listti},{$pull:{item:{_id:Id}}},function(err,result){
    if(!err){
      res.redirect("/"+listti);
    }
  });
}

});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const buttonName=req.body.list;
  const item=new Item({name:itemName});
  if(buttonName==="Today"){
    item.save();
    res.redirect("/");
  }
  else{
    List.findOne({name:buttonName},function(err,result){
      result.item.push(item);
      result.save();
      res.redirect("/"+buttonName);
    });
  }
});

app.get("/about", function(req, res){
  res.render("about");
});
app.get("/:category",function(req,res){
  const catgName= _.capitalize(req.params.category);
   if(List.findOne({name:catgName},function(err,result){
     if((!err)){
       if(!result){
         const list=new List({
           name:catgName,
           item:defaultItem,}
         );
         list.save();
         res.redirect("/"+catgName);
     }
       else{
         res.render("list",{listTitle: catgName, newListItems: result.item});
       }
     }
}));
});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
