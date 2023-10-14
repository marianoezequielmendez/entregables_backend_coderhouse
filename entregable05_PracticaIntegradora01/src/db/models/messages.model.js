import { Schema, model } from "mongoose";

const messagesSchema = new Schema({});

export const messageModel = model("Messages", messagesSchema);
