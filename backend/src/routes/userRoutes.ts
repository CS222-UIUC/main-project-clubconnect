import { Request, Response } from "express";
import { User } from "../interfaces/interfaces";
import { faker } from '@faker-js/faker';

export async function getUser(req: Request, res: Response) {
  // get the user by email address
  const emailAddress = req.body.email;

  if (emailAddress == null) {
    res.status(400).json({message: "No email address provided in HTTP Post body"});
    return;
  }

  // perform database operations to find the user with matching email address

  // for now just use fakerjs to create a user object and send it to the frontend for display

  const userToReturn: User = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    major: faker.person.jobType(),
    age: 20,

    bio: faker.person.bio(),
    profilePictureUrl: "https://media.licdn.com/dms/image/v2/D4E03AQGmOBMB8S3YXA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728078548396?e=1735171200&v=beta&t=lKV2or37oeSrC0ufMeT-nr5qVwnT3YCvvCR_HWq0C48",

    keywords: [],
  }

  res.status(200).json({user: JSON.stringify(userToReturn)});
  return;
}

export async function createUser(req: Request, res: Response) {
  // confirm that all user fields exist

  // sanitize user fields

  // store user object in the database

  res.status(200).json({message: "Successfully created user"});
}