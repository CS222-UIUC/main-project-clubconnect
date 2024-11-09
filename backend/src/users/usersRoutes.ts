import express, { Request, Response } from 'express';
import UserModel from '/Users/ethanmathew/Desktop/main-project-clubconnect/backend/src/users/users';
import OrganizationModel from "/Users/ethanmathew/Desktop/main-project-clubconnect/backend/src/organizations/organization"

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
        return;
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to fetch users' });
        return;
    }
});


router.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findById(req.params.id);
        if(!users) {
            res.status(400).json({error : "USER NOT FOUND"});
            return;
        }
        res.status(200).json(users);
        return;
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to fetch users' });
        return;
    }
});


// DELETE ORG, CREATE ORG, Change org name, change org description, admit members, create events

router.get("/users/deleteorg", async (req: Request, res: Response) => {
    try {
        const { userId, organizationId } = req.query;
        if (!userId || !organizationId) {
            res.status(400).json({ error: 'userId and organizationId are required' });
            return; 
        }
        const user = await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { followed_orgs: organizationId } },
            { new: true }
        )
        if (!user) {
            res.status(400).json({error : "USER NOT FOUND"});
            return;
        }

        res.status(200).json({
            message: 'Organization removed successfully',
            user,
        });
        return; 
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to delete organization' });
        return;
    }
});

// router.post("/users/createorg", async (req: Request, res: Response) => {
//     try {
//         const { userId, organizationId } = req.body;
//         if (!userId || !organizationId) {
//             res.status(400).json({ error: 'userId and organizationId are required' });
//             return;
//         }

//         const user = await UserModel.findByIdAndUpdate(
//             userId,
//             { $addToSet: { followed_orgs: organizationId } }, // $addToSet avoids duplicates
//             { new: true }
//         );

//         if (!user) {
//             res.status(404).json({ error: "User not found" });
//             return;
//         }

//         res.status(200).json({
//             message: 'Organization added successfully',
//             user,
//         });
//         return;
//     } catch (error: any) {
//         res.status(500).json({ error: error.message || 'Failed to add organization' });
//         return;
//     }
// });

router.patch("/organizations/changeorgname", async (req: Request, res: Response) => {
    try {
        const { organizationId, newName } = req.body;
        if (!organizationId || !newName) {
            res.status(400).json({ error: 'organizationId and newName are required' });
            return;
        }

        const organization = await OrganizationModel.findByIdAndUpdate(
            organizationId,
            { name: newName },
            { new: true }
        );

        if (!organization) {
            res.status(404).json({ error: "Organization not found" });
            return; 
        }

        res.status(200).json({
            message: 'Organization name updated successfully',
            organization,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to update organization name' });
        return;
    }
});

router.post('/:userId/organizations/:organizationId/addMember', async (req: Request, res: Response) => {
    try {
        const { userId, organizationId } = req.params;

        // Check if the user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Find the organization and add the user to the members array if not already a member
        const organization = await OrganizationModel.findById(organizationId);
        if (!organization) {
            res.status(404).json({ message: 'Organization not found' });
            return; 
        }

        if (organization.members.includes(userId)) {
            res.status(400).json({ message: 'User is already a member of the organization' });
            return; 
        }

        organization.members.push(userId);
        await organization.save();

        res.json({ message: 'User added as a member successfully', organization });
    } catch (err) {
        res.status(500).json({ message: "ERROR MESSAGE" });
    }
});




export default router;
