const { createLog } = require("../methods/Log");
class Logger {
    // initialize logger
    initLog(Logger) {
        this.Logger = Logger;
    }

    // log message
    async log(msg) {
        const newLog = await createLog(msg);
        return newLog;
    }
}

module.exports = Logger;