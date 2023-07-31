class Config {
    // initialize config data
    constructor() {
        this.configData = {};
    }

    // initialize Config
    initConfig(configFile) {
        this.configData = configFile
    }

    // get config data
    getConfigData() {
        return this.configData;
    }
}

module.exports = Config;