"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../users/users"));
const organization_1 = require("../organizations/organization");
const router = express_1.default.Router();
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.default.find();
        res.status(200).json(users);
        return;
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch users' });
        return;
    }
}));
router.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.default.findById(req.params.id);
        if (!users) {
            res.status(400).json({ error: "USER NOT FOUND" });
            return;
        }
        res.status(200).json(users);
        return;
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch users' });
        return;
    }
}));
// DELETE ORG, CREATE ORG, Change org name, change org description, admit members, create events
router.get("/users/deleteorg", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, organizationId } = req.query;
        if (!userId || !organizationId) {
            res.status(400).json({ error: 'userId and organizationId are required' });
            return;
        }
        const user = yield users_1.default.findByIdAndUpdate(userId, { $pull: { followed_orgs: organizationId } }, { new: true });
        if (!user) {
            res.status(400).json({ error: "USER NOT FOUND" });
            return;
        }
        res.status(200).json({
            message: 'Organization removed successfully',
            user,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to delete organization' });
        return;
    }
}));
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
router.patch("/organizations/changeorgname", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { organizationId, newName } = req.body;
        if (!organizationId || !newName) {
            res.status(400).json({ error: 'organizationId and newName are required' });
            return;
        }
        const organization = yield organization_1.organizationModel.findByIdAndUpdate(organizationId, { name: newName }, { new: true });
        if (!organization) {
            res.status(404).json({ error: "Organization not found" });
            return;
        }
        res.status(200).json({
            message: 'Organization name updated successfully',
            organization,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to update organization name' });
        return;
    }
}));
router.post('/:userId/organizations/:organizationId/addMember', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, organizationId } = req.params;
        // Check if the user exists
        const user = yield users_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Find the organization and add the user to the members array if not already a member
        const organization = yield organization_1.organizationModel.findById(organizationId);
        if (!organization) {
            res.status(404).json({ message: 'Organization not found' });
            return;
        }
        // if (organization.members.includes(userId)) {
        //     res.status(400).json({ message: 'User is already a member of the organization' });
        //     return; 
        // }
        // organization.members.push(userId);
        yield organization.save();
        res.json({ message: 'User added as a member successfully', organization });
    }
    catch (err) {
        res.status(500).json({ message: "ERROR MESSAGE" });
    }
}));
exports.default = router;
