const mongoose = require("mongoose");

class DBService {
    // initialize DB client
    constructor() {
        this.dbClient = null;
    }

    // connect to DB
    async connectDB(database) {
        try {
            if (database?.length > 0) {
                const conn = await mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true });
                return conn?.connection?.readyState === 1;
            }
            return false;
        } catch (error) {
            console.error('Error connecting to DB:', error);
            return false;
        }
    }
}

module.exports = DBService;