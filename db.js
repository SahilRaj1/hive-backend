const mongoose = require('mongoose');
const env = require('dotenv');
const path = require('path')
env.config({ path: './.env' });

const mongoURI = `mongodb+srv://ritikasahil:${process.env.MONGO_PASSWORD}@sahilritika.muqj5ci.mongodb.net/hivedb`;

const connectToMongo = ()=> {
    mongoose.connect(mongoURI, { useNewUrlParser: true,useUnifiedTopology: true },(error)=> {
        if (error) {
            console.log(error.message);
        } else {
            console.log("Conected to mongo cloud successfully");
        }
    });
}

module.exports = connectToMongo;