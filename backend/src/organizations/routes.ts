import { Request, Response } from "express";
import { Organization, organizationModel } from "./organization";
import { HydratedDocument, model } from "mongoose";

export async function createOrganization(req: Request, res: Response) {
  // does the organization field exist in the body
  if (req.body.organization == undefined) {
    res.status(400).json({message: "No organization field in request body"})
    return;
  }

  // try to parse the organization from the body
  if (!isOrganization(req.body.organization)) {
    res.status(400).json({message: "Incorrect JSON structure for organization. Check fields"});
    return;
  }

  const parsedOrganization: Organization = req.body.organization;

  const newOrganization = new organizationModel(parsedOrganization); 

  await newOrganization.save();

  res.sendStatus(200);
}

/** Used to retrieve organizations by their MongoDB _id
 * We chose to use ids because it is what users will store in their database object when they follow an org
 */
export async function getOrganizationById(req: Request, res: Response) {
  try {
    const organizationId = req.query.id;

    if (organizationId == undefined) {
      res.status(400).json({message: "Provide an id query parameter with the mongodb id to retrieve the organization"});
      return;
    }

    const organizationObject: HydratedDocument<Organization> | null = await organizationModel.findOne({_id: organizationId});

    if (organizationObject == null) {
      res.status(404).json({message: "Organization with provided id could not be found"});
      return;
    }

    res.status(200).json({response: JSON.stringify(organizationObject)});
  } catch (error) {
    res.status(400).json({message: JSON.stringify(error)});
  }
}

function isOrganization(requestBodyOrganization: Object): boolean {
  try {
    requestBodyOrganization as Organization;
    return true;
  } catch {
    return false;
  }
}