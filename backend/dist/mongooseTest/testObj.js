"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testModel = exports.testSchema = void 0;
exports.createTestObject = createTestObject;
exports.getTestObject = getTestObject;
const mongoose_1 = require("mongoose");
exports.testSchema = new mongoose_1.Schema({
    name: String,
});
exports.testModel = (0, mongoose_1.model)("Test", exports.testSchema);
function createTestObject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newTest = new exports.testModel(req.body.test);
            newTest.save();
            res.sendStatus(200);
            return;
        }
        catch (_a) {
            console.error("Unable to parse and save object");
            res.sendStatus(401);
            return;
        }
    });
}
function getTestObject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const instance = yield exports.testModel.findOne({ name: req.body.name });
            console.log(instance === null || instance === void 0 ? void 0 : instance.id);
            res.status(200).json({ object: JSON.stringify(instance) });
        }
        catch (_a) {
            console.error("Failed to obtain instance of test object");
            res.sendStatus(400);
        }
    });
}
