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
exports.jwtAuthMiddleware = jwtAuthMiddleware;
exports.hashPassword = hashPassword;
exports.passwordsMatch = passwordsMatch;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/** Custom middleware that confirms a JWT is valid.
 *  This will call the next function if the credentials pass, otherwise it will return
 *  a HTTP 401 unauthorized error
 */
function jwtAuthMiddleware(req, res, next) {
    const JWT_SECRET = process.env["JWT_SECRET"];
    if (!JWT_SECRET) {
        throw new Error("JWT secret could not be read from env file");
    }
    // obtain the JWT from the request header
    const unparsedAuthHeader = req.get("Authorization");
    if (unparsedAuthHeader == undefined /* && !(Array.isArray(unparsedAuthHeader))*/) {
        res.status(401).json({ message: 'Must provide an Authentication header with a Bearer token for proper request auth' });
        return;
    }
    const authHeader = unparsedAuthHeader;
    if (!authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authorization header must start with 'Bearer '" });
        return;
    }
    const authToken = authHeader.split(" ")[1];
    try {
        // change this in production to use the key loaded from the env file
        jsonwebtoken_1.default.verify(authToken, JWT_SECRET);
    }
    catch (error) {
        res.status(401).json({ message: "JWT is expired or invalid" });
        return;
    }
    // if it has passed all auth checks, continue
    next();
}
/** Hashes the password with 10 rounds of salting
 *  @returns The hashed password as a string */
function hashPassword(plaintextPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        // use a moderate number of salting rounds for proper security
        const numberOfSaltingRounds = 10;
        let hashedPassword = yield bcrypt_1.default.hash(plaintextPassword, numberOfSaltingRounds);
        return hashedPassword;
    });
}
/** @returns a boolean value indicating whether the passwords match */
function passwordsMatch(plaintextPassword, hashedPasswordFromDatabase) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plaintextPassword, hashedPasswordFromDatabase);
    });
}
