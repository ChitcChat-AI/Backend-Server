 const {WebSocketServer, WebSocket} = require( 'ws');

const wsExperiments = new WebSocketServer({port: process.env.PORT_WS_EXP});

wsExperiments.on('connection', function connection(ws) {
    ws.on('error', console.error);

});

 wsExperiments.on('update_experiment', (newExperiment) => {
         wsExperiments.clients.forEach((client) => {
             if (client.readyState === WebSocket.OPEN)
                 client.send(JSON.stringify(newExperiment));
         })
     }
 )


module.exports = {wsExperiments};