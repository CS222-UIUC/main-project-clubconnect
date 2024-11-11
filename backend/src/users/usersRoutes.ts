import express, { Request, Response } from 'express';
import UserModel from 'users/users.ts';

const router = express.Router();

// Fetch all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch users' });
    }
});


router.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch user' });
    }
});


export default router;
