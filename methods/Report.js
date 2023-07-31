const Report = require("../models/Report");

function getReport(id) {
    const report = Report.find({ id: id });
    return report;
}

function createReport(type) {
    const newReport = Report.create({
        type: type,
    });
    return newReport;
}

module.exports = {
    getReport, createReport
}