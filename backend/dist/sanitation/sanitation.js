"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = isValidEmail;
exports.isValidPassword = isValidPassword;
exports.containsBadWord = containsBadWord;
const bad_words_1 = require("bad-words");
function isValidEmail(email) {
    // regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // test provided email string against the regex
    return emailRegex.test(email);
}
function isValidPassword(password) {
    // regular expression to check for at least 8 characters, 1 digit, and 1 symbol
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    // test provided password string against the regex
    return passwordRegex.test(password);
}
//use this to reduce profanity in bio, descriptions and other features
function containsBadWord(text) {
    const filter = new bad_words_1.Filter();
    return filter.isProfane(text);
}
