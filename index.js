const express = require("express");
const morgan = require('morgan'); // import morgan
require('dotenv').config();
const port = process.env.PORT || 3000;
const {experimentsRouter} = require("./routers/experimentsRouter");
const {agentsRouter} = require("./routers/agentsRouter");
const {snaGraphRouter} = require("./routers/snaGraphRouter");
const {surveysRouter} = require("./routers/surveysRouter");
const {researcherRouter} = require('./routers/researcherRouter')
const {studiesRouter} = require('./routers/studiesRouter');
const {mailRouter} = require('./routers/mailRouter')
const {APIError} = require('./ErrorHaneling/APIError')
const {logger} = require('./ErrorHaneling/ErrorLogger')
const cors = require('cors');
const rfs = require("rotating-file-stream");

const app = express();
// MORGAN SETUP
// create a log stream
const rfsStream = rfs.createStream("logs/requests.log", {
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

app.use('/api/studies', studiesRouter);
app.use('/api/experiments', experimentsRouter);
app.use('/api/agents', agentsRouter);
app.use('/api/sna', snaGraphRouter);
app.use('/api/surveys', surveysRouter);
app.use('/api/researchers', researcherRouter);
app.use('/api/register', mailRouter);

app.use(async (err, req, res, next) => {
    if (err instanceof APIError) err.handleError();
    else logger.error(err.message, err.stack)
    res.status(err.httpCode || 500);
    res.send(err.description || err.message || 'Something is broken!');
});

app.use((req, res) => {
    res.status(400).send('Something is broken!')
})


app.listen(port, () => console.log(`Express server is running on port ${port}`));
