import { model, Schema } from 'mongoose';
import { Event, eventSchema } from '../events/events';

export interface Organization extends Document {
  name: string;
  description: string;

  established: Date;
  memberCount: number;
  
  profilePictureUrl: string;
  
  keywords: string[];
}

const organizationSchema = new Schema({
  name: String,
  description: String,

  established: Date,
  memberCount: Number,

  profilePictureUrl: String,

  // using an array of strings instead of nested objects for simplicity
  keywords: [String],

  // events: eventSchema,
})

export const organizationModel = model('Organization', organizationSchema);