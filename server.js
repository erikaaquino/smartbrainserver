const bodyParser = require('body-parser');
const express=require('express')
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const { response } = require('express');
const register= require('./controllers/register');
const signIn= require('./controllers/signIn');
const profile= require('./controllers/profile');
const image= require('./controllers/image');
const { env } = require('process');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const db=knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL, //'127.0.0.1', //localhost es lo mismo que esto 
      ssl: true,
    }
  });

db.select('*').from('users').then(data=>{
    // console.log(data)
});
const app=express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res )=>{
    res.send('welcome')
})

app.post('/signin',(req,res)=> {signIn.handleSignIn(req,res,db,bcrypt)})

app.post('/register',(req,res)=> {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

// bcrypt.hash(password, null, null, function(err, hash) {
//     // Store hash in your password DB.
// }); 

//     // Load hash from your password DB.
//     bcrypt.compare("bacon", hash, function(err, res) {
//         // res == true
//     });
//     bcrypt.compare("veggies", hash, function(err, res) {
//         // res = false
//     });

app.listen(process.env.PORT||3000,()=>{
     console.log(`app todo ok, is running on ${process.env.PORT}`);
})