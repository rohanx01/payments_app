const jwt = require("jsonwebtoken");
const { User } = require("../db");
const MONGO_URI = process.env.MONGO_URI;
const z = require("zod");

const JWT_SECRET = process.env.JWT_SECRET;

const mySchema = z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    username: z.string().min(3).max(20)
})

const userAuth = (req,res,next)=> {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username = req.body.username

    const validationResult = mySchema.safeParse({firstName, lastName, username})
    if (!validationResult.success) {
        return res.status(400).json({
            message: "Incorrect Inputs"
        })
    }

    User.findOne({
        username
    })
    .then((value) => {
        if (value) {
            res.status(403).json({
                message: "Username already exists"
            })
        }
        else {
            next()
        }
    })
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        // console.log("Decoded Token: ",decoded)
        // console.log(decoded)
        req.userId = decoded
        next()
    } catch (err) {
        res.status(401).json({
            message: "Invalid token"
        })
    }
    
}

module.exports = {userAuth,authMiddleware};

