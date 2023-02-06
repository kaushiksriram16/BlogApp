const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  const header = req.headers['authorization'];
  if(header !== undefined) {
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if(err) return res.status(401).json({message: "Invalid Token"});
        else {
            req.user = data;
            next();
        }
    })
  }
  else {
    res.status(401).json({message: "No Token found"});
  }
};

module.exports = checkToken;