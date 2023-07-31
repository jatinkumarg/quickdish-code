const Logger = require('./Logger');
class APILogger extends Logger {
    // initialize logger
    initLog(Logger) {
        this.Logger = Logger;
    }
}
module.exports = APILogger;
