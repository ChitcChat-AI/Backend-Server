const uuid = require("uuid");
const { ExpClientMap, WsClientMap} =require('../DB/Maps')
const {getExperimentById} = require("../DB/Queries");
const createSession =  async (req, res) => {
    const id= uuid.v4();
    const {exp_id} = req.body;
    req.session.userId = id;
    ExpClientMap.add(exp_id, id);
    const {exp_status} = await getExperimentById(exp_id);
    res.status(200).json({exp_status : exp_status});

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