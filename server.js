const express = require("express");
const bcrypt = require("bcrypt-nodejs");
var cors = require('cors');
const knex = require('knex');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'root',
      database : 'smart-brain'
    }
  });




const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get("/",(req,res)=>{

    db.select('*').from('users')
        .then(database=>{
            res.json(database);
        })
        .catch(err=>res.status(400).json("Error in fetching database"));

})


app.post("/signin",(req,res)=>signin.handleSignin(req,res,db,bcrypt));      
app.post("/register",(req,res)=>register.handleRegister(req,res,db,bcrypt));
app.get("/profile/:id",(req,res)=>profile.displayProfile(req,res,db));
app.put("/image",(req,res)=>image.handleImage(req,res,db));
app.post("/imageapi",(req,res)=>image.handleImageAPI(req,res));



app.listen(3000,()=>{
    console.log("App is running on port 3000");
})