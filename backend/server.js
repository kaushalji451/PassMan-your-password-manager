const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')
dotenv.config()

// App & Database
const dbName = process.env.DB_NAME 
const app = express()


// Connecting to the MongoDB Client
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

client.connect();
if(client.connect()){
console.log("connected");
}
// middleware
app.use(bodyparser.json())
app.use(cors())

app.get('/',async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const findResult  = await collection.find({}).toArray();
    res.json(findResult);
})

app.post("/",async(req,res)=>{
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult});
})

app.delete("/",async(req,res)=>{
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult});
})

app.listen(8080 , () => {
  console.log(` app listening on port 8080`)
})