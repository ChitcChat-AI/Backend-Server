const { WebSocketServer } = require("ws");
const { WsClientMap, ExpClientMap } = require("../DB/Maps");
const uuid = require("uuid");
const { getExperimentById } = require("../DB/Queries");
const { handleError } = require("../ErrorHaneling/APIError");
const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
  const clientId = uuid.v4();
  WsClientMap.add(clientId, ws);
  ws.on("error", async (err) => await handleError(err));
  ws.on("message", async (data) => {
    const msg = JSON.parse(data);
    ExpClientMap.add(clientId, msg.data);
    const { exp_status } = await getExperimentById(msg.data);
    ws.send(JSON.stringify({ exp_status: exp_status }));
  });
  ws.on("exp-update", (newExp) => {
    const { exp_status } = newExp;
    ws.send(JSON.stringify({ exp_status: exp_status }));
  });
  ws.on("close", () => {
    ExpClientMap.remove(clientId);
    WsClientMap.get(clientId).terminate();
    WsClientMap.remove(clientId);
  });
});
