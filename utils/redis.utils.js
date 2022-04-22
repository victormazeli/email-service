import Redis from 'ioredis';

import * as dontenv from 'dotenv';

dontenv.config();

const redisClient = () => {
    const redis = new Redis({
        port:  6379,
        host: 'localhost',
    })

    setInterval(function() {
        console.log("Keeping alive - Node.js Performance Test with Redis");
        redis.set('ping', 'pong');
    }, 1000 * 60 * 1);
    global.cache = redis
}

export default redisClient