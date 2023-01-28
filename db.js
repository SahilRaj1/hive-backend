
const mongoose = require('mongoose');
const mongoURI = `mongodb+srv://ritikasahil:${process.env.MONGO_PASSWORD}@sahilritika.muqj5ci.mongodb.net/HiveDB`;

const connectToMongo = ()=> {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true },()=> {
        console.log("Conected to mongo cloud successfully");
    });
}

module.exports = connectToMongo;
