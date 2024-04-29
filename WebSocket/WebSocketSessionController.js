const uuid = require("uuid");
const { ExpClientMap } =require('../DB/Maps')
const createSession =  (req, res) => {
    const id= uuid.v4();
    const {exp_id} = req.body;
    req.session.userId = id;
    ExpClientMap.add(exp_id, id);
    res.status(200).send(`success registered client to ${exp_id}` );

}
const destroySession =  (request, response)  =>{
    const ws = WsClientMap.get(request.session.userId);
    console.log('Destroying session');
    request.session.destroy( () => {
        if (ws) ws.close();
        response.send({ result: 'OK', message: 'Session destroyed' });
    });
}

module.exports = {createSession,destroySession}