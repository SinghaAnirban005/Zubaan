import { Router } from "express"
import passport from "../lib/passport"
import { generateToken } from "../utils/jwt"
import { authMiddleware } from "../middlewares/auth.middleware"
import { prisma } from "../lib/prisma"

const router: Router = Router()

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
)

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login"
  }),
  async (req, res) => {
    const user = req.user as any

    if (!user) {
      return res.status(401).json({
        message: "Authentication failed"
      })
    }

    const token = generateToken(user.id)

    res.redirect(
      `${process.env.FRONTEND_URL}/auth/success?token=${token}`
    )
  }
)

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).userId

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    res.status(200).json({
      message: 'usset fetched',
      data: user
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Internal server error"
    })
  }
})

router.post("/logout", authMiddleware, async (req, res) => {
  res.json({
    message: "Logged out successfully"
  })
})

export default router