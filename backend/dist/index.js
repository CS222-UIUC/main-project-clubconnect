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
// import { initializeDatabaseConnection, initializeEnvironmentalVariables } from './databaseSetup/initializeConnection';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // initialize connection pool and environment variables
        // initializeEnvironmentalVariables();
        // await initializeDatabaseConnection();
        const application = (0, express_1.default)();
        const port = process.env.BACKEND_SERVER_PORT || 3000;
        // use the json middleware 
        application.use(express_1.default.json());
        // ADD ROUTES HERE
        // start the server
        application.listen(port, () => {
            console.log("Application is running on port " + port);
        });
    });
}
// keep this function call here. We don't really need to have a main function but makes the code structuring a bit easier
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}))();
// use MOCHA/chai library for route testing 
