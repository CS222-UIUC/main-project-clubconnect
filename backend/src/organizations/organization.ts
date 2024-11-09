import { Schema, model, Document } from 'mongoose';
import { Event, eventSchema, Keyword } from '../events/events';

export interface Organization extends Document {
  name: string;
  description: string;

  established: Date;
  memberCount: number;
  members: string[];
  
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
  members: { type: [String], required: true }, // added memberids to store active members in the org

  profilePictureUrl: String,

  events: { type: [eventSchema], default: [] }, //made this a list because we need a list of events
})

const OrganizationModel = model<Organization>('Organization', organizationSchema);
export default OrganizationModel;