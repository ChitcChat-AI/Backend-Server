// const session = require('express-session');
// const express = require('express');
// const http = require('http');
// const {WebSocketSessionRouter} =require('./WebSocketSessionRouter')
// const { WebSocketServer } = require('ws');
// const cors = require('cors');
// const {WsClientMap, ExpClientMap} = require("../DB/Maps");
// const {getExperimentById} = require('../DB/Queries')
// function onSocketError(err) {
//     console.error(err);
// }
// const app = express();
// const map = new Map();
// const sessionParser = session({
//     saveUninitialized: false,
//     secret: '$eCuRiTy',
//     resave: false
// });
// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));
// app.use(sessionParser);
// app.use('/ws-session', WebSocketSessionRouter)
// app.use((req, res) => {
//     console.log(req.path);
//     res.status(400).send('Something is broken!');
// });
// const server = http.createServer(app);
// const wss = new WebSocketServer({ clientTracking: false, noServer: true });
// server.on('upgrade', function (request, socket, head) {
//     socket.on('error', onSocketError);
//
//     sessionParser(request, {}, () => {
//         // if (!request.session.userId) {
//         //     socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
//         //     socket.destroy();
//         //     return;
//         // }
//         socket.removeListener('error', onSocketError);
//         wss.handleUpgrade(request, socket, head, function (ws) {
//             wss.emit('connection', ws, request);
//         });
//     });
// });
//
// wss.on('connection',  async (ws, request) => {
//     const userId = request.session.userId;
//
//     ws.on('error', console.error);
//     ws.on('exp-update', function (newExp) {
//         const {exp_status} = newExp;
//         ws.send({exp_status: exp_status});
//     });
//     ws.send('hello');
// });
//
//
//
// server.listen(3001, function () {
//     console.log('WS server is listening on  port 3001');
// });


const {WebSocketServer} = require('ws');
const {WsClientMap, ExpClientMap} = require('../DB/Maps')
const uuid = require("uuid");
const {json} = require("express");
const {getExperimentById} = require("../DB/Queries");
const wss = new WebSocketServer({port: 3001});

wss.on('connection',  (ws) => {
    const clientId = uuid.v4();
    ws.on('error', console.error);
    ws.on('message', async (data) => {
        const msg = JSON.parse(data);
        ExpClientMap.add(clientId, msg.data);
        const {exp_status} = await getExperimentById(msg.data);
        ws.send(JSON.stringify({exp_status: exp_status}))
    });
    ws.on('exp-update', (newExp) => {
        const {exp_status} = newExp;
        ws.send(JSON.stringify({exp_status: exp_status}));
    })
    WsClientMap.add(clientId, ws);
});
