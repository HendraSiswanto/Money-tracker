declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export default function authMiddleware(req, res, next) {
  const userId = req.header("x-user-id");

  if (!userId) {
    return res.status(401).json({ error: "Missing user ID" });
  }

  req.userId = userId;
  next();
}
