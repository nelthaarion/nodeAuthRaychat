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
exports.sessionMiddleware = void 0;
const redis_1 = require("../configs/redis");
const sessionMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sessionId = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.sessionId;
    try {
        if (!sessionId) {
            const newSessionId = `sess:${Date.now()}`;
            res.cookie('sessionId', newSessionId, { httpOnly: true, secure: true });
            yield (0, redis_1.getRedisClient)();
            req.session = {};
        }
        else {
            const sessionData = yield (0, redis_1.getRedisClient)().get(sessionId);
            req.session = sessionData ? JSON.parse(sessionData) : {};
        }
        res.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
            if (req.session) {
                yield (0, redis_1.getRedisClient)().set(sessionId, JSON.stringify(req.session));
            }
        }));
    }
    catch (error) {
        console.log(error);
    }
    next();
});
exports.sessionMiddleware = sessionMiddleware;
