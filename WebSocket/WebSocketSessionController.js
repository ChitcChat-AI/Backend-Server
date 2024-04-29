const uuid = require("uuid");
const {WsClientServiceMap} = require('../DB/Maps')
const createSession =  (req, res) => {
    const id= uuid.v4();

    req.session.userId = id;
    res.send({ result: 'OK', message: 'Session updated' });
}
const destroySession =  (request, response)  =>{
    const ws = WsClientServiceMap.get(request.session.userId);
    console.log('Destroying session');
    request.session.destroy(function () {
        if (ws) ws.close();
        response.send({ result: 'OK', message: 'Session destroyed' });
    });
}

module.exports = {createSession,destroySession}