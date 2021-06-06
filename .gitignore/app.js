const express = require('express');
const dotenv = require('dotenv');
const User = require('./models/userSchema');
var cors = require('cors');

require('./db/connection.ts');

const app = express();

const port = process.env.PORT || 8080;

app.use(cors())
app.use(express.json());
app.use(require('./routes/routes'))

app.listen(port, () => {
    console.log(`server started at port ${port}`)
});