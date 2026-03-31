import { Router } from "express";

import passport from "../lib/passport"
import { generateToken } from "../utils/jwt";

const router: Router = Router()

router.get('/google', passport.authenticate("google", {
    scope: ["profile", "email"]
  }))

router.get('/google/callback', passport.authenticate("google", {
    session: false,
    failureRedirect: '/login'
}, async(req, res) => {
    const user = req.user as any

    if (!user) {
        return res.status(401).json({
        message: "Authentication failed"
        })
    }

    const token = generateToken(user.id)

    // redirect to frontend
    res.redirect(
        `${process.env.FRONTEND_URL}/auth/success?token=${token}`
    )
})
)

router.post("/logout", async(req, res) => {
  res.json({
    message: "Logged out successfully"
  })
})

export default router