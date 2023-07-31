const Log = require("../models/Log");

async function getLogs() {
    const logs = await Log.find({});
    return logs;
}

async function createLog(msg) {
    const newLog = await Log.create({
        msg: msg,
    });
    return newLog;
}

module.exports = {
    getLogs, createLog
}