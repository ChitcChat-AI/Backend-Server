 const {WebSocketServer, WebSocket} = require( 'ws');

const wsExperiments = new WebSocketServer({port: process.env.PORT_WS_EXP, path: '/experiments'});
const wsSurvey = new WebSocketServer({port: process.env.PORT_WS_SUR, path: '/survey'});

wsExperiments.on('connection', function connection(ws) {
    ws.on('error', console.error);

});
wsSurvey.on('connection', function connection(ws) {
    ws.on('error', console.error);

});
 wsExperiments.on('update_experiment', (newExperiment) => {
         wsExperiments.clients.forEach((client) => {
             if (client.readyState === WebSocket.OPEN)
                 client.send(JSON.stringify(newExperiment));
         })
     }
 )
 wsSurvey.on('update_survey_vote', (newSurveyResults) => {
     wsSurvey.clients.forEach((client) => {
         if (client.readyState === WebSocket.OPEN)
             client.send(JSON.stringify(newSurveyResults));
     })
 })

module.exports = {wsExperiments, wsSurvey};