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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const usersRoutes_1 = __importDefault(require("./users/usersRoutes"));
const routes_1 = __importDefault(require("./organizations/routes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongooseSetup();
        const application = (0, express_1.default)();
        const port = process.env.BACKEND_SERVER_PORT || 2000;
        // use the json middleware 
        application.use((0, cors_1.default)());
        application.use(express_1.default.json());
        application.use('/users', usersRoutes_1.default);
        application.use('/orgs', routes_1.default);
        // start the server
        application.listen(port, () => {
            console.log("Application is running on port " + port);
        });
    });
}
// use MOCHA/chai library for route testing 
function mongooseSetup() {
    return __awaiter(this, void 0, void 0, function* () {
        // get uri from env file
        const mongoConnectionString = process.env["MONGODB_CONNECTION_URI"];
        if (!mongoConnectionString) {
            throw new Error("MongoDB connection string is not in the env file or named properly");
        }
        mongoose_1.default.connect(mongoConnectionString).then(() => {
            console.log("Successfully connected to mongodb cluster");
        }).catch(() => {
            console.error("Could not connect to mongodb cluster");
        });
    });
}
// keep this function call here. We don't really need to have a main function but makes the code structuring a bit easier
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}))();
