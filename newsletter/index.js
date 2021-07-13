const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function (req,res) {
    var email=req.body.email;
    var fistName=req.body.first;
    var lastName=req.body.last;

    var data={
         members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fistName,
                    LNAME:lastName,
                }
            }
        ]
    };
    var jsonData=JSON.stringify(data);
    var options={
        url:"https://us4.api.mailchimp.com/3.0/lists/bd414bc924",
        method:"POST",
        headers:{
            "Authorization":"Ahmad 56958702b292a02c5e4a098dff68df18-us4"
        },
        body: jsonData,
    }
    request(options,function (error,response,body) {
        if(error){
            res.sendFile(__dirname+"/failure.html");
        }
        else if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
    })
})
app.post("/failure",function (req,res) {
    res.redirect("/");
})
app.listen(process.env.PORT||3000,function () {
    console.log("Server connected");
})
    // unique-id
// 56958702b292a02c5e4a098dff68df18-us4
// list id
// bd414bc924