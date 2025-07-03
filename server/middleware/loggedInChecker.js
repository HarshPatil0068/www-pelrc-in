// Importing the dependencies.
const jwt = require('jsonwebtoken');

const loggedInChecker = (req, res, next)=>{
    const token = req.cookies.token; // requiring the token from the route.

    if(!token) return res.status(400).send({message : "Unauthorized. No token provided"}); // Checking if the token is valid for not by checking it's secret message.

    try{
        let data = jwt.verify(token,"harsh"); // Throws error if token does not match. 
        req.user = data; // Assigning the token data to the request

        next();

    } catch(err){
        return res.status(401).send({message : "Invalid or Expired token."});
    }
}

module.exports = loggedInChecker;