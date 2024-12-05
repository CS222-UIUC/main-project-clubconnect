import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// NOTE this will be replaced by an actual key in an env file for production
const JWT_SECRET = process.env["JWT_SECRET"];

if (!JWT_SECRET) { throw new Error("JWT secret could not be read from ") }

/** Custom middleware that confirms a JWT is valid.
 *  This will call the next function if the credentials pass, otherwise it will return
 *  a HTTP 401 unauthorized error
 */
export function jwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  // obtain the JWT from the request header
  const unparsedAuthHeader = req.headers["Authorization"];
  
  if (unparsedAuthHeader == null && unparsedAuthHeader != undefined && !(Array.isArray(unparsedAuthHeader))) {
    res.status(401).json({message: 'Must provide an Authentication header with a Bearer token for proper request auth'});
    return;
  }

  const authHeader = unparsedAuthHeader as string;
  const authToken = authHeader.split(" ")[1];
  
  try {
    // change this in production to use the key loaded from the env file
    jwt.verify(authToken, JWT_SECRET as string);
  } catch(error) {
    res.status(401).json({message: "JWT is expired or invalid"});
    return;
  }

  // set 
  
  // if it has passed all auth checks, continue
  next();
}

/** Hashes the password with 10 rounds of salting
 *  @returns The hashed password as a string */
export async function hashPassword(plaintextPassword: string): Promise<string> {
  // use a moderate number of salting rounds for proper security
  const numberOfSaltingRounds = 10;
  
  let hashedPassword = await bcrypt.hash(plaintextPassword, numberOfSaltingRounds);
  
  return hashedPassword;
}

/** @returns a boolean value indicating whether the passwords match */
export async function passwordsMatch(plaintextPassword: string, hashedPasswordFromDatabase: string): Promise<boolean> {
  return await bcrypt.compare(plaintextPassword, hashedPasswordFromDatabase);
}

