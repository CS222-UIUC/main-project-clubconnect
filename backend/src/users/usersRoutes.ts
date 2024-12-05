import { Request, Response, Router } from 'express';
import { UserModel } from '../users/users';
import { organizationModel } from "../organizations/organization";
import { hashPassword, passwordsMatch, jwtAuthMiddleware } from '../auth/authentication';
import jwt from 'jsonwebtoken';

// NOTE: Replace this with your actual secret key in production
const SUPER_SECRET_KEY_FOR_JWT_SIGNING = "";

interface JwtPayload {
    email: string;
}

// Function to handle user login
async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'User ID and password are required' });
            return;
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid user ID or password' });
            return;
        }

        // Compare password using passwordsMatch from authorization.ts
        const isMatch = await passwordsMatch(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid user ID or password' });
            return;
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email, id: user._id }, SUPER_SECRET_KEY_FOR_JWT_SIGNING, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: JSON.stringify(error) });
    }
}

// Function to create a new user
async function createUser(req: Request, res: Response) {
    try {
        const {
            email,
            password,
            firstName,
            lastName,
            major,
            age,
            bio,
            profilePictureUrl,
            keywords,
        } = req.body;

        if (
            !email ||
            !password ||
            !firstName ||
            !lastName ||
            !major ||
            age === undefined ||
            !bio ||
            !profilePictureUrl ||
            !keywords
        ) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await hashPassword(password);

        // Create new user
        const newUser = new UserModel({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            major,
            age,
            bio,
            profilePictureUrl,
            followed_orgs: [],
            keywords,
        });
        await newUser.save();

        const token = jwt.sign({ email: newUser.email }, SUPER_SECRET_KEY_FOR_JWT_SIGNING, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ message: JSON.stringify(error) });
    }
}

// Function to follow an organization
async function followOrganization(req: Request, res: Response) {
    try {
        const { orgId } = req.body;

        if (!orgId) {
            res.status(400).json({ message: 'Organization ID is required' });
            return;
        }

        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            res.status(401).json({ message: 'Authorization header missing' });
            return;
        }
        const token = authHeader.split(' ')[1];

        const decoded = jwt.decode(token) as JwtPayload;

        if (!decoded || !decoded.email) {
            res.status(401).json({ message: 'Invalid token payload' });
            return;
        }

        const email = decoded.email;

        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const organization = await organizationModel.findById(orgId);
        if (!organization) {
            res.status(404).json({ message: 'Organization not found' });
            return;
        }

        user.followed_orgs = user.followed_orgs || [];
        if (user.followed_orgs.includes(orgId)) {
            res.status(400).json({ message: 'Already following this organization' });
            return;
        }

        user.followed_orgs.push(orgId);
        await user.save();

        res.status(200).json({ message: 'Organization followed successfully' });
    } catch (error) {
        res.status(500).json({ message: JSON.stringify(error) });
    }
}

// Export this router and merge it with main router in index file for code simplicity
const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/', createUser);
userRouter.post('/followOrg', jwtAuthMiddleware, followOrganization);

export default userRouter;
