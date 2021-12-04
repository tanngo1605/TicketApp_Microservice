import mongoose from 'mongoose'
import { Password } from "../services/password"

interface UserAttr {
    email: string,
    password: string
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttr): UserDoc
}
interface UserDoc extends mongoose.Document {
    email: string,
    password: string
}
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre("save", async function (next) {

    //1st create pass
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"))
        this.set("password", hashed)

    }
    next()
})

userSchema.statics.build = (attrs: UserAttr) => new User(attrs)
const User = mongoose.model<UserDoc, UserModel>("User", userSchema)

export { User }