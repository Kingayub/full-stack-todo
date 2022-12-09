const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.json("Not authorizated");
  }
  const [type, token] = authorization.split(" ");
  if (type !== "Bearer") {
    return res.status(401).json("Неверный тип токена");
  }
    req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY);
    console.log(req.user)
    next();
  } catch (error) {
    res.status(401).json("Неверный токен");
  }
};
