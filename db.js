
const mongoose = require('mongoose');
const mongoURI = `mongodb+srv://ritikasahil:${process.env.MONGO_PASSWORD}@sahilritika.muqj5ci.mongodb.net/?retryWrites=true&w=majority`;

const connectToMongo = ()=> {
    mongoose.connect(mongoURI, ()=> {
        console.log("Conected to mongo cloud successfully");
    });
}

module.exports = connectToMongo;
