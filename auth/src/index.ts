import express from 'express'
//handle async error
import "express-async-errors"

import { currentUserRouter } from "./route/current-user"
import { signinRouter } from "./route/signin"
import { singoutRouter } from "./route/signout"
import { signupRouter } from "./route/signup"
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/notFoundError'
import mongoose from 'mongoose'

const app = express();
app.use(express.json());

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(singoutRouter)

app.all("*", () => { throw new NotFoundError() })

app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth")
        console.info("Database connected")
    }
    catch (e) {
        console.error(e)
    }
    app.listen(3000, () => {
        console.log("Listen on port 3000 on Auth service")
    })
}
start()

