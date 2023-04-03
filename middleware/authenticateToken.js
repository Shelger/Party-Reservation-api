require("dotenv").config();

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(400).send('Access token missing');
    }
      
      const token = authHeader.split(" ")[1];
      if (token === null) {
        return res.status(401).send('No access token');
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { 
            res.status(403).send('Access token is wrong');
          }
        else {
        req.user = user.name;
        next();
        }
      });
    }

    module.exports = authenticateToken;