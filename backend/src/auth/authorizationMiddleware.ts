import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from 'jsonwebtoken'
import { Organization, organizationModel } from "../organizations/organization";
import { HydratedDocument, ObjectId, Types } from "mongoose";

export async function isAdmin(req: Request, res: Response): Promise<boolean> {
  try {
    // get user id
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) { res.status(500).json({message: "cannot find token in request body after passing middleware"}); return false;}

    const decodedJwt = jwt.decode(token) as JwtPayload;

    const userId = new Types.ObjectId(decodedJwt["id"]);

    // get org id from path param
    const orgId = req.params["id"];

    if (!orgId) { return false; }

    //const organization
    const org = await organizationModel.findOne({_id: orgId});

    if (!org) {
      return false;
    }
    
    for (const adminId of org.admins) {
      if (adminId == userId) {
        return true;
      }
    }

    return false;
  } catch (error) {
    return false;
  }
}

export async function isOwner(req: Request): Promise<boolean> {
  return false;
}
