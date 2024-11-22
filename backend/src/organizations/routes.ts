import { Request, Response, Router } from "express";
import { Organization, organizationModel } from "./organization";
import { HydratedDocument, model } from "mongoose";

async function createOrganization(req: Request, res: Response) {
  try {
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
  } catch (error) {
    res.status(500).json({message: JSON.stringify(error)});
  }
}

/** Used to retrieve organizations by their MongoDB _id
 * We chose to use ids because it is what users will store in their database object when they follow an org
 */
async function getOrganizationById(req: Request, res: Response) {
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

    res.status(200).json({organizationObject});
  } catch (error) {
    res.status(400).json({message: error});
  } 
}

/** Searches mongodb for a substring in the title or in the bio */
async function getOrganizationBySubstring(req: Request, res: Response) {
  try {
    const search = req.query.search;

    if (!search) {
      res.status(400).json({message: "You need to provide a search query parameter in the request"});
      return;
    }

    const organizations = await organizationModel.find({ 
      $or : [
        { name: { $regex : search, $options: "i"} }, 
        { description: { $regex: search, $options: "i"} }
      ],
    });

    res.json({ organizations });
  } catch (error) {
    res.status(500).json({message: error});
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

// export this router and merge it with main router in index file for code simplicity
const organizationsRouter = Router();

// ADD ROUTES HERE
organizationsRouter.post("/", async (req, res) => await createOrganization(req, res));
organizationsRouter.get("/id", async (req, res) => await getOrganizationById(req, res));
organizationsRouter.get("/substring", async (req, res) => await getOrganizationBySubstring(req, res));

export default organizationsRouter;