const express = require('express');
const mongoose = require('mongoose')
const redis = require('redis')
const os = require('os')



//const redis = require('redis')
// init app

const PORT = 4000;


const app = express();







const REDIS_HOST = 'redis'; // 
const REDIS_PORT = '6379'; 

const client = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`});

    client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', ()=> console.log('connecting to redis...'));


 client.connect();


  




 const DB_USER = 'root';
 const DB_PASSWORD = 'example';
 const DB_PORT = '27017';
 // Change '172.18.0.2' to 'mongo' (the service name in docker-compose.yml)
 const host = 'mongo'; // <-- THIS IS THE CHANGE!
 const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${host}:${DB_PORT}`;
 
 // Add options for Mongoose to handle potential authentication issues if not set up directly in URI
 mongoose.connect(URI, {
     useNewUrlParser: true, // Recommended
     useUnifiedTopology: true, // Recommended
     user: DB_USER,         // Explicitly pass user
     pass: DB_PASSWORD,     // Explicitly pass password
     authSource: 'admin'    // Usually 'admin' for root user
 }).then(() => console.log('✅ connect to db...')).catch(err => console.log('❌ failed to connect to db: ', err));
 




 client.set('pages', 'page1 page 2 page 3');
const pagesList =  client.get('pages');


app.get('/', (req, res) => res.send('<h1> Hello There 150</h1>'));
app.get('/pages', (req, res) => res.send(`<h2> ${pagesList} ... </h2>`));

app.listen(PORT, () => console.log(`App is up and running on port: ${PORT} welcome back1`));
