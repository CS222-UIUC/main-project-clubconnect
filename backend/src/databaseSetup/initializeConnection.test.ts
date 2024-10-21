import { initializeEnvironmentalVariables } from "./initializeConnection"

// ensures that the password verification and hashing is functioning properly
test("Environment Variables are properly loaded", async () => {
  initializeEnvironmentalVariables();

  const testVariable: string = process.env['TEST'] || "0";

  console.log("TEST VAR: " + testVariable);

  expect(Number.parseInt(testVariable) == 1);
})
