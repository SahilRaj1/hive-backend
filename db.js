const mongoose = require('mongoose');
const env = require('dotenv');
env.config({ path: `${__dirname}/.env` });

const mongoURI = `mongodb+srv://ritikasahil:${process.env.MONGO_PASSWORD}@sahilritika.muqj5ci.mongodb.net/hivedb`;

const connectToMongo = ()=> {

    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true },(error)=> {
        if (error) {
            console.log(error.message);
        } else {
            console.log("Conected to mongo cloud successfully");
        }
    });
    
}

mongoose.set('strictQuery', false);

module.exports = connectToMongo;