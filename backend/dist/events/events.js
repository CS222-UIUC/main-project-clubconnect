"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventSchema = exports.InterestType = void 0;
const mongoose_1 = require("mongoose");
var InterestType;
(function (InterestType) {
    InterestType[InterestType["Professional"] = 0] = "Professional";
    InterestType[InterestType["Recreational"] = 1] = "Recreational";
    InterestType[InterestType["Other"] = 2] = "Other";
})(InterestType || (exports.InterestType = InterestType = {}));
exports.eventSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    startDateAndTime: Date,
    endDateAndTime: Date,
    meetingAddress: String,
    membersAttending: Number,
});
