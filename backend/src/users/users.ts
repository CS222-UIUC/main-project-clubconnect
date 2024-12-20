// users.ts
import { Document, Schema, model } from 'mongoose';

// Interface extending the Document to ensure type safety
export interface User extends Document {
    email: string;
    password: string; // Added password field

    // Personal information for profile
    firstName: string;
    lastName: string;
    major: string;
    age: number;
    bio: string;
    profilePictureUrl: string;
    followedOrgs: string[]; // Specify array of strings for organization IDs
    keywords: Keyword[];
}

export interface Keyword {
    interestType: InterestType;
    name: string;
}

export enum InterestType {
    Professional = "Professional",
    Recreational = "Recreational",
    Other = "Other",
}

// Define schema for the Keyword subdocument
const keywordSchema = new Schema<Keyword>({
    interestType: {
        type: String,
        enum: Object.values(InterestType), // Enum values for interest type
        required: true,
    },
    name: { type: String, required: true },
});

// Define Mongoose schema for the User
const userSchema = new Schema<User>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Added password field
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    major: { type: String, required: true },
    age: { type: Number, required: true },
    bio: { type: String, required: true },
    profilePictureUrl: { type: String, required: true },
    followedOrgs: { type: [String], required: true }, // Array of strings for followed_orgs
    keywords: { type: [keywordSchema], required: true }, // Use the keyword schema
});

// Export the Mongoose model
export const UserModel = model<User>('User', userSchema);
