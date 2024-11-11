import { Document } from "mongodb";
import { Schema } from "mongoose";

export interface Event extends Document {
  // what
  name: string;
  description: string;
  
  // when
  startDateAndTime: Date;
  endDateAndTime: Date;

  // where
  meetingAddress: string;

  // determines if only members or everyone can see events
  isPublic: boolean;
}

// Keyword to represent what type of interest it is, and be flexible enough to add other information in the future
export const eventSchema = new Schema({
  name: String,
  description: String,

  startDateAndTime: Date,
  endDateAndTime: Date,

  meetingAddress: String,

  isPublic: Boolean,
});
