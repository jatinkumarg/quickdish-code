const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Log = mongoose.model("Log", LogSchema);
module.exports = Log;