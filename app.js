const express= require("express");
const bodyParser=require("body-parser");
const request = require("request");
const path = require("path");

const https = require("https");

const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));




function displayData(){
  const url="https://datausa.io/api/data?drilldowns=State&measures=Population";
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const populationData=JSON.parse(data);
      // for displaying all the data
      for(int i=0; i<populationData.length; i++){
        const pop1= populationData.source[i].annotations.source_name
        const pop2=populationData.source[i].annotations.source_description
        const pop3=populationData.source[i].annotations.dataset_name
        const pop4=populationData.source[i].annotations.dataset_link
        const pop5=populationData.source[i].annotations.table_id
        const pop6=populationData.source[i].annotations.topic
        const pop7=populationData.source[i].annotations.subtopic
        const tempVariable=document.getElementByTagName("p");
        tempVariable.innerHTML=pop1+" "+pop2+" "+pop3+" "+pop4+" "+pop5+" "+pop6+" "+pop7;
      }
  });

}


//index page
app.get("/", function(req,res){
  displayData();
  res.sendFile(__dirname + "/index.html");
});


//Getting the api data
app.post("/", function(req, res){
  const state=req.body.stateName;
  const year=req.body.year;
  console.log(state);
  console.log(year);
  const url="https://datausa.io/api/data?drilldowns=State&measures=Population&year="+year+"&State="+state;
   https.get(url, function(response){
     console.log(response.statusCode);
     response.on("data", function(data){
       const populationData=JSON.parse(data);
       console.log(populationData);
       const pop1= populationData.source[0].annotations.source_name
       const pop2=populationData.source[0].annotations.source_description
       const pop3=populationData.source[0].annotations.dataset_name
       const pop4=populationData.source[0].annotations.dataset_link
       const pop5=populationData.source[0].annotations.table_id
       const pop6=populationData.source[0].annotations.topic
       const pop7=populationData.source[0].annotations.subtopic
       res.write("Source Name : "+pop1);
       res.write("Source Description : "+pop2);
       res.write("Dataset Name : "+pop3);
       res.write("Dataset Link : "+pop4);
       res.write("Table Id : "+pop5);
       res.write("Topic : "+pop6);
       res.write("Subtopic : "+pop7);
       res.send();
   });
});


//localhost
app.listen(3000,function(){
   console.log("Server is running on port 3000");
});
