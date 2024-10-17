import { hashPassword, passwordsMatch } from "./authentication";

// ensures that the password verification and hashing is functioning properly
test("Password Hashing and Verification Work as Expected", async () => {
  const plaintextPassword = "hello123";
  
  const hashedPassword = await hashPassword(plaintextPassword);
  
  const doPasswordsMatch = await passwordsMatch(plaintextPassword, hashedPassword);
  
  expect(doPasswordsMatch);
})

// test the jwt middleware