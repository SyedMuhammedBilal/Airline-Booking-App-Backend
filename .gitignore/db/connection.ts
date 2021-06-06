const mongoose = require("mongoose");

const URI = "mongodb+srv://shayan:12345@cluster0.oq61y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
    console.log('connection successful')
}).catch((err) => {
    console.log(err);
});