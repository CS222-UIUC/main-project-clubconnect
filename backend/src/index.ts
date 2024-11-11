import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createOrganization, getOrganizationById } from './organizations/routes';
import { createTestObject, getTestObject } from './mongooseTest/testObj';

async function main() {
  dotenv.config();

  await mongooseSetup();

  const application: Application = express();
  const port = process.env.BACKEND_SERVER_PORT || 3000;
  
  // use the json middleware 
  application.use(express.json());
  
  // ADD ROUTES HERE
  application.post("/org/create/", async (req, res) => await createOrganization(req, res));
  application.get("/org/get/", async (req, res) => await getOrganizationById(req, res));

  application.post("/test/create/", async(req, res) => await createTestObject(req, res));
  application.post("/test/get/", async(req, res) => await getTestObject(req, res));

  // start the server
  application.listen(port, () => {
    console.log("Application is running on port " + port);    
  })
}

// use MOCHA/chai library for route testing 

async function mongooseSetup() {
  // get uri from env file
  const mongoConnectionString = process.env["MONGODB_CONNECTION_URI"];

  if (!mongoConnectionString) {
    throw new Error("MongoDB connection string is not in the env file or named properly");
  }

  mongoose.connect(mongoConnectionString).then(() => {
    console.log("Successfully connected to mongodb cluster");
  }).catch(() => {
    console.error("Could not connect to mongodb cluster");
  }); 

}

// keep this function call here. We don't really need to have a main function but makes the code structuring a bit easier
(async () => {
  await main();
})();