import { Schema } from 'mongoose';
import { Event, eventSchema, Keyword } from '../events/events';

export interface Organization extends Document {
  name: string;
  description: string;

  established: Date;
  memberCount: number;
  
  organizationId: string;
  profilePictureUrl: string;
  
  // list of all events for the club, sorted by date
  events: Event[];
  
  keywords: Keyword[];
}

const organizationSchema = new Schema({
  name: String,
  description: String,

  established: Date,
  memberCount: Number,

  profilePictureUrl: String,

  events: eventSchema,
})