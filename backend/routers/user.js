import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/users.model.js";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"

const router = Router();


router.post("/signup", async (req, res)=> {
    const {email, username, password} = req.body;

    // const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password
    })
    res.status(201).json(user)
})

router.post("/login", passport.authenticate("local", {
    session: false
}), (req, res) => {
    let token = null;
    if(req.user) {
        const _id = req.user._id;
        const payload = {_id};
        token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
    }
    res.cookie("token", token)
    res.json({message: 'login success!'})
})

router.post("/logout", (req, res, next)=> {
    try {
    // The only task is to clear the cookie containing the JWT
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    next(err);
  }
})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "calistasalsa.cpw@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD
    }
})

router.post("/send-email", async(req, res)=> {
    const {to, subject, text} = req.body;
    try {
        await transporter.sendMail({
            from: "calistasalsa.cpw@gmail.com",
            to,
            subject,
            text
        })
        res.json({success: true})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
})

router.get("/login/google", passport.authenticate("google", {scope: ["profile", "email"]}))

router.get("/login/google/callback",
    passport.authenticate("google", {session: false}),
    (req, res) => {
        let token = null;
        if(req.user) {
            const _id = req.user._id;
            const payload = {_id};
            token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
        }
        res.cookie("token", token)
        res.json({message: 'login success!'})
    }
)

router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No token provided or token is invalid" });
    }
    // Return user data (without the hashed password)
    const { username, email, _id } = req.user;
    res.json({ username, email, _id });
});

export default router;