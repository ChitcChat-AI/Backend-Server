const express = require("express");
const morgan = require('morgan'); // import morgan
require('dotenv').config();
const port = process.env.PORT || 3000;
const { experimentsRouter } = require("./routers/experimentsRouter");
const { agentsRouter } = require("./routers/agentsRouter");
const cors = require('cors');
const rfs = require("rotating-file-stream");

const app = express();
// MORGAN SETUP
// create a log stream
const rfsStream = rfs.createStream("log.txt", {
    size: '10M', // rotate every 10 MegaBytes written
    interval: '1d', // rotate daily
    compress: 'gzip' // compress rotated files
})

// add log stream to morgan to save logs in file
app.use(morgan("dev", {
    stream: rfsStream
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/experiments', experimentsRouter);
app.use('/api/agents', agentsRouter);


app.use((req, res) => {
    res.status(400).send('Something is broken!');
});

app.listen(port, () => console.log(`Express server is running on port ${port}`));