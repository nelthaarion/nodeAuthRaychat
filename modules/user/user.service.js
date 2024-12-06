"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.deleteUser = exports.updateUser = exports.getUserById = void 0;
const mongodb_1 = require("mongodb");
const user_model_1 = require("./user.model");
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.userCollection.findOne({ _id: new mongodb_1.ObjectId(userId) }, { projection: { password: 0 } }); // Exclude password
});
exports.getUserById = getUserById;
const updateUser = (userId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.userCollection.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $set: updates });
});
exports.updateUser = updateUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.userCollection.deleteOne({ _id: new mongodb_1.ObjectId(userId) });
});
exports.deleteUser = deleteUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.userCollection.find({}, { projection: { password: 0 } }).toArray(); // Exclude passwords
});
exports.getAllUsers = getAllUsers;
