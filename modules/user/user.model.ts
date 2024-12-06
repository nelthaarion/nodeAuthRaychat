import { getDB } from "../../configs/mongo";

const db = getDB("myAppDB");
export const userCollection = db.collection("users");
