import { Request, Response, NextFunction } from "express";

export async function isAdmin(req: Request): Promise<boolean> {
  // get email from JWT
  
  // get user id
  // query database where admin contains this user's id
}

export async function isOwner(req: Request): Promise<boolean> {

}
