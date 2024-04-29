const session = require('express-session');
const express = require('express');
const http = require('http');
const {WebSocketSessionRouter} =require('./WebSocketSessionRouter')
const { WebSocketServer } = require('ws');
const cors = require('cors');
function onSocketError(err) {
    console.error(err);
}
const app = express();
const map = new Map();
const sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy',
    resave: false
});
app.use(cors());
app.use(express.static('public'));
app.use(sessionParser);
app.use('/ws-session', WebSocketSessionRouter)
app.use((req, res) => {
    console.log(req.path);
    res.status(400).send('Something is broken!');
});
const server = http.createServer(app);
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on('upgrade', function (request, socket, head) {
    socket.on('error', onSocketError);
    console.log('Parsing session from request...', request);
    sessionParser(request, {}, () => {
        if (!request.session.userId) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }
        console.log('Session is parsed!');

        socket.removeListener('error', onSocketError);

        wss.handleUpgrade(request, socket, head, function (ws) {
            wss.emit('connection', ws, request);
        });
    });
});

wss.on('connection', function (ws, request) {
    const userId = request.session.userId;

    map.set(userId, ws);

    ws.on('error', console.error);

    ws.on('message', function (message) {
        //
        // Here we can now use session parameters.
        //
        console.log(`Received message ${message} from user ${userId}`);
    });

    ws.on('close', function () {
        map.delete(userId);
    });
});

server.listen(3001, function () {
    console.log('Listening on http://localhost:3001');
});