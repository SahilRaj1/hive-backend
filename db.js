const mongoose = require('mongoose');
const mongoURI = `mongodb+srv://ritikasahil:ritikasahil@sahilritika.muqj5ci.mongodb.net/hivedb`;

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
