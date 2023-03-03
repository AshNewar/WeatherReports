const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

// const bodyParser=require("body-parser");
const { response } = require("express");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000,function(){
    console.log("Started");
});
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const city=req.body.cityname;
    const appid="528aedf2572173a05421a7fdb07b106e";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+appid;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const description=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            res.write("<h1>The Description of Weather is "+description+"</h1>");
            res.write("<h1>The temperature of "+city+" is "+temp+" degree Celcius");
            res.send();
        })
    })    
})

