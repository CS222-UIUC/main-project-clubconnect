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
const authentication_1 = require("./authentication");
// ensures that the password verification and hashing is functioning properly
test("Password Hashing and Verification Work as Expected", () => __awaiter(void 0, void 0, void 0, function* () {
    const plaintextPassword = "hello123";
    const hashedPassword = yield (0, authentication_1.hashPassword)(plaintextPassword);
    const doPasswordsMatch = yield (0, authentication_1.passwordsMatch)(plaintextPassword, hashedPassword);
    expect(doPasswordsMatch);
}));
// test the jwt middleware
