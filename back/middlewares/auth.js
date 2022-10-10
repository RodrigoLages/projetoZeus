const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.status(401).json({ msg: "Usuário não logado" });
  
    try {
  
      jwt.verify(token, process.env.SECRET);
      return next();
  
    } catch (err) {
      res.status(403).json({ msg: 'Token inválido' });
      console.log(err);
    }
  }