"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationModel = void 0;
const mongoose_1 = require("mongoose");
const organizationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    established: { type: Date, required: true },
    memberCount: { type: Number, required: true },
    profilePictureUrl: { type: String, required: false },
    owner: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    admins: { type: [mongoose_1.Schema.Types.ObjectId], required: true }
});
exports.organizationModel = (0, mongoose_1.model)('Organization', organizationSchema);
