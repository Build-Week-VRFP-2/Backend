const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    jwt.verify(authorization, process.env.JWTSECRET, (error, decodedToken) => {
      if (error) {
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
