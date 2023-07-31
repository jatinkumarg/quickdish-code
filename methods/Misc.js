const Misc = require("../models/Misc");

async function getVisitorCount() {
    const misc = Misc.findOne({});
    return misc?.visitorCount;
}


async function updateVisitorCount() {
    try {
        const misc = await Misc.findOne({});
        misc.visitorCount += 1;
        return await misc.save();
    } catch (error) {
        console.log('Error updating visitor count:', error);
    }
}

module.exports = {
    getVisitorCount, updateVisitorCount
}