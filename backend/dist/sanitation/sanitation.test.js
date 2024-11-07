"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sanitation_1 = require("./sanitation");
test("isValidEmail works as expected", () => {
    //check valid email addresses
    expect((0, sanitation_1.isValidEmail)("test@example.com")).toBe(true);
    expect((0, sanitation_1.isValidEmail)("user.name+tag@domain.co")).toBe(true);
    //check invalid email addesses
    expect((0, sanitation_1.isValidEmail)("test@.com")).toBe(false);
    expect((0, sanitation_1.isValidEmail)("user@domain")).toBe(false);
    expect((0, sanitation_1.isValidEmail)("user@domain..com")).toBe(false);
    expect((0, sanitation_1.isValidEmail)("userdomain.com")).toBe(false);
});
test("isValidPassword works as expected", () => {
    expect((0, sanitation_1.isValidPassword)("StrongPass123!")).toBe(true);
    expect((0, sanitation_1.isValidPassword)("Another#Pass!2")).toBe(true);
    expect((0, sanitation_1.isValidPassword)("weak")).toBe(false);
    expect((0, sanitation_1.isValidPassword)("onlylowercaseletters")).toBe(false);
    expect((0, sanitation_1.isValidPassword)("123456789")).toBe(false);
});
test("containsBadWord works as expected", () => {
    expect((0, sanitation_1.containsBadWord)("This is a clean sentence.")).toBe(false);
    expect((0, sanitation_1.containsBadWord)("This sentence contains damn!")).toBe(true);
});
