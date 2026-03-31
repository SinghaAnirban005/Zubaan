import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

interface CustomJwtPayload extends JwtPayload {
  userId: string
}

export interface AuthRequest extends Request {
  userId?: string
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided"
    })
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      message: "Invalid token format"
    })
  }

  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error("JWT_SECRET not defined")
  }

  try {

    const decoded = jwt.verify(
      token,
      secret
    ) as unknown as CustomJwtPayload

    req.userId = decoded.userId

    next()

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token"
    })
  }
}