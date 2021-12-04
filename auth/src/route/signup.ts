import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/requestValidationError";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../model/user";
const router = express.Router();

router.post("/api/users/signup",
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Invalid Password"),
    async (req: Request, res: Response) => {
        //req will be modified based on prev middleware
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array())

        }
        const { email, password } = req.body;
        const existUser = await User.findOne({ email })

        if (existUser) {
            throw new BadRequestError("This email is already used")
        }
        console.info("Creating user...")
        const user = User.build({ email, password })
        await user.save()

        res.status(201).json({
            message: "Account created with user" + user
        })

    })

export { router as signupRouter }