const jwt = require("jsonwebtoken");
require("dotenv").config({path:'./config/keys.env'});

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.userData = {email: decodedToken.email, userId: decodedToken.userId};
        next();
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};