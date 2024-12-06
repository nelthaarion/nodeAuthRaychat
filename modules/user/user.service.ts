import { ObjectId } from "mongodb";
import { userCollection } from "./user.model";

export const getUserById = async (userId: string) => {
    return userCollection.findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } }); // Exclude password
};

export const updateUser = async (userId: string, updates: Partial<{ username: string; role: string }>) => {
    await userCollection.updateOne({ _id: new ObjectId(userId) }, { $set: updates });
};

export const deleteUser = async (userId: string) => {
    await userCollection.deleteOne({ _id: new ObjectId(userId) });
};

export const getAllUsers = async () => {
    return userCollection.find({}, { projection: { password: 0 } }).toArray(); // Exclude passwords
};
