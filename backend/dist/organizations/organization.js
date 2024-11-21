"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationModel = void 0;
const mongoose_1 = require("mongoose");
const organizationSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    established: Date,
    memberCount: Number,
    profilePictureUrl: String,
    // events: eventSchema,
});
exports.organizationModel = (0, mongoose_1.model)('Organization', organizationSchema);
