import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
const port = 3000;
const URL = "https://api.edamam.com/api/recipes/v2"; //API url
const result = dotenv.config()
const apiKey = result.parsed.API_KEY;  
const appId = result.parsed.API_ID; 

app.use(bodyParser.urlencoded({extended:true}))




app.get("/", (req,res)=>{
    res.render("index.ejs")
});

// we are making request to the edamam api
app.post("/recipe", async (req,res)=>{
    const result = await axios.get(URL,{
        params:{
            type: "public",
            q: req.body.recipeName,
            app_id: appId,
            app_key: apiKey,
            random: "true"
        }
    });
    // i am only sending the dishes 
    res.render("index.ejs",{content:result.data.hits})
});

app.listen(port, ()=>{
    console.log(`server is started in port :${port}`);
});