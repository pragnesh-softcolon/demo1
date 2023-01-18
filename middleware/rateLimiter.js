import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000, // 1 hrs in milliseconds
  max: 1000, // Max no of requests allowed in windowMs
  message: "You have exceeded the 1000 requests in 1 hrs limit!",
  headers: true,
});

export default rateLimiter;
