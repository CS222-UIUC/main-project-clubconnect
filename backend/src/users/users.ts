import { Document, Schema, model } from 'mongoose';

// Interface extending the Document to ensure type safety
export interface User extends Document {
    userId: string;

    // Personal information for profile
    firstName: string;
    lastName: string;
    major: string;
    age: number;
    
    bio: string;
    profilePictureUrl: string;
    keywords: Keyword[];
}

export interface Keyword {
    interestType: InterestType;
    name: string;
}

export enum InterestType {
    Professional,
    Recreational,
    Other,
}

// Define Mongoose schema for the User
const userSchema = new Schema<User>({
    userId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    major: { type: String, required: true },
    age: { type: Number, required: true },
    bio: { type: String, required: true },
    profilePictureUrl: { type: String, required: true },
    
    // defining the keywords for user interests
    keywords: [
        {
            interestType: {
                type: String, 
                enum: Object.values(InterestType), // mapping for values
                required: true
            },
            name: { type: String, required: true },
        }
    ]
});

// export the Mongoose model
const UserModel = model<User>('User', userSchema);
export default UserModel;
