import { getDB } from "../../configs/mongo";

const db = getDB("myAppDB");
export const authCollection = db.collection("users");
