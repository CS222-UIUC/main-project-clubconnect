//import { Router, Request, Response } from "express";
//import { Event, eventModel } from "./events";
//import { ObjectId } from "mongoose";
//
//async function createEventForOrganization(organizationId: string, event: Event) {
//  const newEvent = new eventModel(event);
//
//  newEvent.save();
//}
//
///** Does not check any privileges or validation */
//async function deleteEventForOrganization(eventId: string) {
//  eventModel.findByIdAndDelete(eventId);
//}
//
//async function getEventsInTimeRange(organizationId: ObjectId, startTime: Date, endTime: Date) {
//  const currentDate = new Date();
//
//  const weekFromNow = new Date(currentDate.getTime() + (7 * 24 * 60 * 60 * 1000));
//
//  const searchResult = await eventModel.find({
//    _id: organizationId,
//    startDateAndTime: {
//      $gt : currentDate,
//      $lt : weekFromNow,
//    }
//  })
//
//
//  console.log(searchResult);
//  //return searchResult;
//}
//
//// add the event to the events table and push the organizationId to the event
//
//async function createEventRoute(req: Request, res: Response) {
//  if (!req.body['event']) {
//    res.status(400).json({message: "No event in request body"})
//    return;
//  }
//
//  let eventToAdd: Event;
//  try {
//    eventToAdd = req.body['event'];
//  } catch (error) {
//    res.status(400).json({message: "Malformed event in request body. " + error})
//    return;
//  }
//
//  eventModel.create(eventToAdd);
//
//  res.status(200).json({message: "Successfully created event for organization"});
//}
//
//async function deleteEventRoute(req: Request, res: Response) {
//
//}
//
///** Has query parameters that determine the organization */
//async function getEventsRoute(req: Request, res: Response) {
//  const organizationId: ObjectId = req.query["organizationId"];
//
//
//  getEventsInTimeRange()
//}
//
//export const eventRouter = Router();
//
//eventRouter.get("/", async (req, res) => await getEventsRoute(req, res));
//eventRouter.post("/", async (req, res) => await createEventRoute(req, res));
//eventRouter.delete("/", async (req, res) => await deleteEventRoute(req, res));
