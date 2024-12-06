import { Request, Response, NextFunction } from 'express';
import { getRedisClient } from '../configs/redis';

export const sessionMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const sessionId = req.cookies?.sessionId;

    try {
      if (!sessionId) {
        const newSessionId = `sess:${Date.now()}`;
       res.cookie('sessionId', newSessionId, { httpOnly: true, secure: true });
       await getRedisClient()
       req.session = {};
     } else {
   
       const sessionData = await getRedisClient().get(sessionId);
       req.session = sessionData ? JSON.parse(sessionData) : {};
     }
   
     res.on('finish', async () => {
        if (req.session) {
         await getRedisClient().set(sessionId, JSON.stringify(req.session));
       }
     });
    } catch (error) {
     console.log(error);
      
    }

  next();
};
