require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { mongoClient } = require('./constants');
const api = require('./routes/api');
const auth = require('./routes/auth');
const { response } = require('express');
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json())
app.use("/api", api)
app.use("/auth", auth)

const port = 5000;

app.listen(port, async () => {
    await mongoClient.connect();
    console.log("Listenning on port : " + port);

});

