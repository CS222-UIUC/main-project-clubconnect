import { Request, Response, Router } from "express";
import { Organization, organizationModel } from "./organization";
import { HydratedDocument, model } from "mongoose";
import { ObjectId } from "mongodb";
import { isAdmin, isOwner } from '../auth/authorizationMiddleware'
import { jwtAuthMiddleware } from "../auth/authentication";

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

    // check if an org with the same name exists
    let existingOrg = await organizationModel.exists({name: parsedOrganization.name});

    if (existingOrg != null) {
      res.status(400).json({message: "Organization with that name already exists."})
      return;
    }

    const newOrganization = new organizationModel(parsedOrganization); 

    await newOrganization.save();

    organizationModel.findOneAndReplace()

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


async function getOrganizationsByIds(req: Request, res: Response) {
  //try {
  //  const organizationIds = req.query.ids;
  //
  //  if (!organizationIds) {
  //    res.status(400).json({message: "Provide an ids query parameter with the MongoDB ids to retrieve the organizations"});
  //    return;
  //  }
  //
  //  // Convert organizationIds to an array if needed
  //  const idsArray = Array.isArray(organizationIds) ? organizationIds : [organizationIds];
  //
  //  // Ensure IDs are ObjectIds
  //  const objectIds = idsArray.map((id) => new ObjectId(id));
  //
  //  const requestedOrganizations = await organizationModel
  //    .find({ _id: { $in: objectIds } })
  //    .lean();
  //
  //  res.status(200).json({ requestedOrganizations });
  //} catch (error) {
  //  res.status(500).json({ message: "Server error: " + error });
  //}
  res.sendStatus(200);
}

/** Searches mongodb for a substring in the title or in the bio */
async function getOrganizationBySubstring(req: Request, res: Response) {
  try {
    const search = req.query.search;

    if (!search) {
      res.status(400).json({message: "You need to provide a search query parameter in the request"});
      return;
    }

    const organizations: HydratedDocument<Organization>[] = await organizationModel.find({ 
      $or : [
        { name: { $regex : search, $options: "i"} }, 
        { description: { $regex: search, $options: "i"} }
      ],
    });

    res.status(200).json({ organizations });
  } catch (error) {
    res.status(500).json({message: error});
  }
}

async function updateOrganization(req: Request, res: Response) {
  await isAdmin(req, res); // confirm they are authorized

  const id = req.params["id"] as string;

  if (!id) {
    res.status(400).json({message: "Must provide an id path parameter"});
    return;
  }

  const updates = req.body;

  try {
    if (!ObjectId.isValid(id)) {
      res.status(400).json({message: "Invalid organization id"});
      return;
    }

    const validFields = Object.keys(organizationModel.schema.obj);

    // filter updated fields
    const filteredUpdates = Object.keys(updates)
      .filter(key => validFields.includes(key))
      .reduce((acc, key) => {
        acc[key] = updates[key];
        return acc;
      }, {} as Record<string, any>)

    // update organization in database
    const updatedOrganization = await organizationModel.findByIdAndUpdate(id, 
      {$set: filteredUpdates},
      {new: true, runValidators: true}
    );


    if (!updatedOrganization) {
      res.status(404).json({message: "Organization was not found in database"});
      return;
    }

    res.status(200).json({message: "Updated organization"})
  } catch (error) {
    res.status(500).json({message: "server error"})
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


async function getUserIdByEmail(email: string): Promise<ObjectId> {
  return new ObjectId();
}

async function deleteOrganization(req: Request, res: Response) {
  await isAdmin(req, res); // confirm they are authorized

  const id = req.params["id"] as string;

  if (!id) {
    res.status(400).json({message: "Must provide an id path parameter"});
    return;
  }

  const updates = req.body;

  try {
    if (!ObjectId.isValid(id)) {
      res.status(400).json({message: "Invalid organization id"});
      return;
    }

    await organizationModel.findByIdAndDelete(id);

    res.status(200).json({message: "Deleted organization"})
  } catch (error) {
    res.status(500).json({message: "server error"})
  }

}

// export this router and merge it with main router in index file for code simplicity
const organizationsRouter = Router();

// ADD ROUTES HERE
organizationsRouter.post("/", jwtAuthMiddleware, async (req, res) => await createOrganization(req, res));
organizationsRouter.get("/id", jwtAuthMiddleware, async (req, res) => await getOrganizationById(req, res));
organizationsRouter.get("/ids", jwtAuthMiddleware, async (req, res) => await getOrganizationsByIds(req, res));
organizationsRouter.get("/substring", jwtAuthMiddleware, async (req, res) => await getOrganizationBySubstring(req, res));
organizationsRouter.patch("/:id", jwtAuthMiddleware, async (req, res) => await updateOrganization(req, res));
organizationsRouter.delete("/:id", jwtAuthMiddleware, async (req, res) => await deleteOrganization(req, res));

export default organizationsRouter;
