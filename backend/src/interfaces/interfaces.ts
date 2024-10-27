// import {Document} from 'mongodb';

// // TODO - finish learning how to use mongoose and mongodb in translating interfaces to documents and back

// export interface Event extends Document {
//   eventId: string;

//   // the name of the event
//   name: string;
//   description: string;
  
//   // set a range for the event timing
//   startDateAndTime: Date;
//   endDateAndTime: Date;

//   meetingAddress: string;

//   membersAttending: number;
// }

// export interface Organization extends Document {
//   name: string;
//   description: string;

//   established: Date;
//   memberCount: number;
  
//   organizationId: string;
//   profilePictureUrl: string;
  
//   // list of all events for the club, sorted by date
//   events: Event[];
  
//   keywords: Keyword[];
// }

// export interface User extends Document {
//   userId: string;

//   // personal information for profile
//   firstName: string;
//   lastName: string;
//   major: string;
//   age: number;
  
//   bio: string;
//   profilePictureUrl: string;
  
//   // keywords that represent interests to match for finding clubs that one might like
//   keywords: Keyword[];
// }

// // Keyword to represent what type of interest it is, and be flexible enough to add other information in the future
// export interface Keyword {
//   interestType: InterestType
//   name: string;
// }
  
// export enum InterestType {
//   Professional,
//   Recreational,
//   Other,
// }