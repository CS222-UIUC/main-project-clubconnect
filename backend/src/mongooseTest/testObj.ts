import { Request, Response } from "express";
import mongoose, { model, Schema } from "mongoose";

export interface Test {
  name: string,
}

export const testSchema = new Schema({
  name: String,
})

export const testModel = model("Test", testSchema);

export async function createTestObject(req: Request, res: Response) {
  try {
    const newTest = new testModel(req.body.test);

    newTest.save();

    res.sendStatus(200);
    return;
  } catch {
    console.error("Unable to parse and save object");

    res.sendStatus(401);
    return;
  }
}

export async function getTestObject(req: Request, res: Response) {
  try {
    const instance = await testModel.findOne({name: req.body.name})

    console.log(instance?.id);

    res.status(200).json({object: JSON.stringify(instance)});
  } catch {
    console.error("Failed to obtain instance of test object");

    res.sendStatus(400);
  }
}