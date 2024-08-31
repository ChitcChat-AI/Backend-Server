const { ExpUnsubMap } = require("../DB/Maps");
const { updateExperimentStatus } = require("../DB/Queries");
const { statusOptions } = require("../constants");
const { firestoreColListener } = require("../DB/FirebaseColListener");
const { ExpClientMap, WsClientMap } = require("../DB/Maps");
const { sendMailToAllParticipants } = require("./SendMailToParticipants");

const ChangeExperimentStatus = async (expId, newStatus) => {
  if (newStatus === statusOptions.RUNNING) {
    const unsub = firestoreColListener(expId);
    ExpUnsubMap.add(expId, unsub);
  }
  if (newStatus === statusOptions.COMPLETED) {
    ExpUnsubMap.get(expId);
    ExpUnsubMap.remove(expId);
  }
  const newExp = await updateExperimentStatus(expId, newStatus);
  const clientsArr = ExpClientMap.getKeysByValue(expId);
  clientsArr.map((client) => {
    const ws = WsClientMap.get(client);
    if (ws) {
      ws.emit("exp-update", newExp)
    };
  });
  return newExp;
};

module.exports = { ChangeExperimentStatus };
