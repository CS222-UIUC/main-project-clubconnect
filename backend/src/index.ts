import express, { Application, Request, Response } from 'express';

async function main() {
  const application: Application = express();
  const port = process.env.BACKEND_SERVER_PORT || 3000;
  
  // use the json middleware 
  application.use(express.json());
  
  // ADD ROUTES HERE

  // start the server
  application.listen(port, () => {
    console.log("Application is running on port " + port);    
  })
}

// keep this function call here. We don't really need to have a main function but makes the code structuring a bit easier
(async () => {
  await main();
})

// use MOCHA/chai library for route testing 