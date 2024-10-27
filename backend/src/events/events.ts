import { Document } from "mongodb";
import { Schema } from "mongoose";

export interface Event extends Document {
  // the name of the event
  name: string;
  description: string;
  
  // set a range for the event timing
  startDateAndTime: Date;
  endDateAndTime: Date;

  meetingAddress: string;

  membersAttending: number;
}

// Keyword to represent what type of interest it is, and be flexible enough to add other information in the future
export interface Keyword {
  interestType: InterestType
  name: string;
}
  
export enum InterestType {
  Professional,
  Recreational,
  Other,
}

export const eventSchema = new Schema({
  name: String,
  description: String,

  startDateAndTime: Date,
  endDateAndTime: Date,

  meetingAddress: String,
  membersAttending: Number,
});
