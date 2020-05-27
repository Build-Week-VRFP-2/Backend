const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const secret = process.env.JWTSECRET || 'bananas'
    if (authorization) {
      jwt.verify(authorization, secret, (error, decodedToken) => {
        if (error) {
          console.log(error, decodedToken)  
          res.status(401).json({ errorMessage: "Invalid Credentials" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(400).json({ errorMessage: "No credentials Provided" });
    }
  };