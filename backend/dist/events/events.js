"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventSchema = void 0;
const mongoose_1 = require("mongoose");
// Keyword to represent what type of interest it is, and be flexible enough to add other information in the future
exports.eventSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    startDateAndTime: Date,
    endDateAndTime: Date,
    meetingAddress: String,
    isPublic: Boolean,
});
