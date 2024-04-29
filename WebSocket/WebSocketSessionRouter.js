const {Router} = require('express');
const WsSessionController = require('./WebSocketSessionController');

const WebSocketSessionRouter = new Router();

WebSocketSessionRouter.post('/', WsSessionController.createSession);
WebSocketSessionRouter.delete('/', WsSessionController.destroySession);

module.exports ={WebSocketSessionRouter};