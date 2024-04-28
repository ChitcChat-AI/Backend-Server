const {ExpUnsubMap} = require('../DB/ExperimentUnsubMap')
const {updateExperimentStatus} =require('../DB/Queries')
const {statusOptions} =require('../constants')
const {firestoreColListener} = require('../DB/FirebaseColListener')
const ChangeExperimentStatus = async (expId, newStatus) => {

    if (newStatus === statusOptions.RUNNING){
        const unsub = firestoreColListener(expId);
        ExpUnsubMap.add(expId, unsub);
    }
    if (newStatus === statusOptions.COMPLETED){
        ExpUnsubMap.get(expId)();
        ExpUnsubMap.remove(expId);
    }

    return await updateExperimentStatus(expId, newStatus);

}

module.exports = {ChangeExperimentStatus}