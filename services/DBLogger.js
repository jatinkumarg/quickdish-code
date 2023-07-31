const Logger = require('./Logger');

class DBLogger extends Logger {
    // initialize logger
    initLog(Logger) {
        this.Logger = Logger;
    }
}

module.exports = DBLogger;