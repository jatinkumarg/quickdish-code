const mongoose = require("mongoose");

const MiscSchema = new mongoose.Schema({
    visitorCount: {
        type: Number,
        default: 0,
    }
});

const Misc = mongoose.model("Misc", MiscSchema);
module.exports = Misc;