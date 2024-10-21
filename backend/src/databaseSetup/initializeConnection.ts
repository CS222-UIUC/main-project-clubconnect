import dotenv from 'dotenv';
import mongoose from 'mongoose';

// This is still a work in progress as I need to configure the .env file and IP address whitelisting
//  so each group member is able to test their code. For now I will be using faker.js to provide mock
//  information to populate HTTP responses.
export async function initializeDatabaseConnection() {
  const mongodbConnectionUri = getConnectionString();
  mongoose.connect(mongodbConnectionUri);
}

function getConnectionString(): string {
  const connectionUri = process.env["MONGODB_CONNECTION_STRING"];

  if (connectionUri == null) {
    throw new Error("Environment variables have not been loaded or connection uri has not been set in .env file");
  }

  return connectionUri;
}

export function initializeEnvironmentalVariables() {
  dotenv.config({ path: "../.env" });
}

