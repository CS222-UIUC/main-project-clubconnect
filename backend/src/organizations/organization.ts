import { model, ObjectId, Schema } from 'mongoose';
//import { Event, eventSchema } from '../events/events';

export interface Organization extends Document {
  name: string;
  description: string;

  established: Date;
  memberCount: number;
  
  profilePictureUrl: string;

  owner: ObjectId;
  admins: ObjectId[];
}

const organizationSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},

  established: {type: Date, required: true},
  memberCount: {type: Number, required: true},

  profilePictureUrl: {type: String, required: false},

  owner: {type: Schema.Types.ObjectId, required: true},
  admins: {type: [Schema.Types.ObjectId], required: true}
})

export const organizationModel = model('Organization', organizationSchema);
