"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const events_1 = require("../events/events");
const organizationSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    established: Date,
    memberCount: Number,
    profilePictureUrl: String,
    events: events_1.eventSchema,
});
