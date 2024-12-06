import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authCollection } from "./auth.model";
import { getRedisClient } from "../../configs/redis";

//to have stronger hash set  second parameter of hash function upper , ex: 12
export const register = async (username: string, password: string, role: string) => {
  const user = await authCollection.findOne({ username });
  console.log(user);
  
  if (!user?._id){
    const hashedPassword = await bcrypt.hash(password, 10);
    await authCollection.insertOne({ username, password: hashedPassword, role });
    return true
  } else {
    return false
  }
};

export const login = async (username: string, password: string) => {
    const user = await authCollection.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
    }
    
    const token = generateToken(user._id.toString())
    return token;
};
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const TOKEN_EXPIRY_SECONDS = 3600; 
const redisClient = getRedisClient()
export const generateToken = async (userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
  
  await redisClient.set(`token:${token}`, 'valid', {
    EX: TOKEN_EXPIRY_SECONDS,
  }).then(console.log).catch(console.error);

  return token;
};

export const verifyToken = async (token: string): Promise<any> => {
  try {
    const tokenStatus = await redisClient.get(`token:${token}`);
    if (tokenStatus !== 'valid') {
      throw new Error('Invalid or expired token');
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error:any) {
    throw new Error('Token verification failed: ' + error.message);
  }
};

export const revokeToken = async (token: string) => {
  await redisClient.del(`token:${token}`);
};
