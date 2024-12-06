import { createClient } from "redis";

const redisClient = createClient({
    url: "redis://127.0.0.1:6379"
});


redisClient.on("error", (err) => console.error("Redis error:", err));

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Redis connected");
    } catch (error) {
        console.error("Failed to connect to Redis:", error);
        process.exit(1);
    }
};

export const getRedisClient = () => redisClient;
