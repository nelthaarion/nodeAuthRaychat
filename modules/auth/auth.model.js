"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCollection = void 0;
const mongo_1 = require("../../configs/mongo");
const db = (0, mongo_1.getDB)("myAppDB");
exports.authCollection = db.collection("users");
