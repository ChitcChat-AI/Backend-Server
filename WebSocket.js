 const {WebSocketServer, WebSocket} = require( 'ws');

const wss = new WebSocketServer({port: process.env.PORT_WS});

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

});
 wss.on('update_experiment', (newExperiment) => {
         wss.clients.forEach((client) => {
             if (client.readyState === WebSocket.OPEN)
                 client.send(JSON.stringify(newExperiment));
         })
     }
 )
 wss.on('update_survey_vote', (newSurveyResults) => {
     wss.clients.forEach((client) => {
         if (client.readyState === WebSocket.OPEN)
             client.send(JSON.stringify(newSurveyResults));
     })
 })

module.exports = {wss};