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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeToken = exports.verifyToken = exports.generateToken = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("./auth.model");
const redis_1 = require("../../configs/redis");
//to have stronger hash set  second parameter of hash function upper , ex: 12
const register = (username, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.authCollection.findOne({ username });
    console.log(user);
    if (!(user === null || user === void 0 ? void 0 : user._id)) {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield auth_model_1.authCollection.insertOne({ username, password: hashedPassword, role });
        return true;
    }
    else {
        return false;
    }
});
exports.register = register;
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.authCollection.findOne({ username });
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        throw new Error("Invalid credentials");
    }
    const token = (0, exports.generateToken)(user._id.toString());
    return token;
});
exports.login = login;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const TOKEN_EXPIRY_SECONDS = 3600;
const redisClient = (0, redis_1.getRedisClient)();
const generateToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
    yield redisClient.set(`token:${token}`, 'valid', {
        EX: TOKEN_EXPIRY_SECONDS,
    }).then(console.log).catch(console.error);
    return token;
});
exports.generateToken = generateToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenStatus = yield redisClient.get(`token:${token}`);
        if (tokenStatus !== 'valid') {
            throw new Error('Invalid or expired token');
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        throw new Error('Token verification failed: ' + error.message);
    }
});
exports.verifyToken = verifyToken;
const revokeToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.del(`token:${token}`);
});
exports.revokeToken = revokeToken;
