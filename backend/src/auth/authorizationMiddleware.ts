import { Request, Response, NextFunction } from "express";

export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  // get email from JWT

}

export async function ownerMiddleware(req: Request, res: Response, next: NextFunction) {

}

/*
  Think about how to implement this middleware,
  middleware function for each role (owner, admin)

*/