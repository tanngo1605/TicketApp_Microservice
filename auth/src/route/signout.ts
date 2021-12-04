import express from "express";

const router = express.Router();

router.post("/api/users/singout", (req, res) => {

    res.send("Current user")

})

export { router as singoutRouter }