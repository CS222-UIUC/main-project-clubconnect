"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.InterestType = void 0;
// users.ts
const mongoose_1 = require("mongoose");
var InterestType;
(function (InterestType) {
    InterestType["Professional"] = "Professional";
    InterestType["Recreational"] = "Recreational";
    InterestType["Other"] = "Other";
})(InterestType || (exports.InterestType = InterestType = {}));
// Define schema for the Keyword subdocument
const keywordSchema = new mongoose_1.Schema({
    interestType: {
        type: String,
        enum: Object.values(InterestType), // Enum values for interest type
        required: true,
    },
    name: { type: String, required: true },
});
// Define Mongoose schema for the User
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Added password field
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    major: { type: String, required: true },
    age: { type: Number, required: true },
    bio: { type: String, required: true },
    profilePictureUrl: { type: String, required: true },
    followedOrgs: { type: [String], required: true }, // Array of strings for followed_orgs
    keywords: { type: [keywordSchema], required: true }, // Use the keyword schema
});
// Export the Mongoose model
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
