const jwt = require("jsonwebtoken");

const checkUser = (req, res, next) => {
  const token = req.cookies.token;
  res.locals.isLoggedIn = false;
  res.locals.user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      res.locals.isLoggedIn = true;
      res.locals.user = decoded;
    } catch (err) {
      res.clearCookie("token"); // invalid token
    }
  }

  next();
};

module.exports = checkUser;
