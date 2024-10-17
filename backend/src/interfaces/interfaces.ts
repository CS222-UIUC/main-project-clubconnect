/* 
  Considerations:
    - type of ids for events, user, orgs, do you want it to be a string?
    - converting special types like dates into their mongodb counterparts
*/
 
export interface Event {
  meetingId: string;

  // the name of the event
  name: string;
  
  // set a range for the event timing
  startDateAndTime: Date;
  endDateAndTime: Date;

  meetingAddress: string;

  membersAttending: number;
}

export interface Organization {
  name: string;

  established: Date;
  memberCount: number;
  
  organizationId: string;
  
  // list of all events for the club, sorted by date
  events: Event[];
  
  keywords: Keyword[];
}

export interface User {
  userId: string;

  // personal information for profile
  firstName: string;
  lastName: string;
  major: string;
  age: number;
  
  bio: string;
  
  // keywords that represent interests to match for finding clubs that one might like
  keywords: Keyword[];
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