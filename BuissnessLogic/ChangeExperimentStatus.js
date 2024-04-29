const {ExpUnsubMap} = require('../DB/Maps')
const {updateExperimentStatus} =require('../DB/Queries')
const {statusOptions} =require('../constants')
const {firestoreColListener} = require('../DB/FirebaseColListener')
const {ExpClientMap ,WsClientMap} = require('../DB/Maps')
const ChangeExperimentStatus = async (expId, newStatus) => {

    if (newStatus === statusOptions.RUNNING){
        const unsub = firestoreColListener(expId);
        ExpUnsubMap.add(expId, unsub);

    }
    if (newStatus === statusOptions.COMPLETED){
        try {
            ExpUnsubMap.get(expId)();
        }catch (err){
            console.log(err);
            console.log(ExpUnsubMap.get(expId))
        }
        ExpUnsubMap.remove(expId);
    }

    const clientsArr =  ExpClientMap.getKeysByValue(expId);
    clientsArr.map((client) =>{
        const ws = WsClientMap.get(client);
        if(ws) ws.emit('exp-update');
    })
    return await updateExperimentStatus(expId, newStatus);

}

module.exports = {ChangeExperimentStatus}