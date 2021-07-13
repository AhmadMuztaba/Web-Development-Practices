const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function (req,res) {
    var a1=req.body.crypto;

    var a2=req.body.fiat;
    var a3=req.body.amount;

    var options={
        uri:"https://apiv2.bitcoinaverage.com/convert/global",
        method:"GET",
        qs:{
           from:a1,
           to:a2,
           amount:a3,
        }

    }
    request(options,function (error,response,body) {
        var data=JSON.parse(body);
        var price=data.price;
        var time=data.time;

        res.write("<p>time is "+time+"</p>");
        res.write(a3+" "+a1+" is"+" "+price+" "+a2 +"<br>");
       res.send();
        
    })

})
app.listen(3000,function () {
    console.log("server running at 3000");
})