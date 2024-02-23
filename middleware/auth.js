const jwt = require('jsonwebtoken');
const User = require("../model/userModel/userSchema");



async function authenticateToken(req, res, next) {
    try {
      const token = req.cookies.token || req.params.token;
  
      if (!token) {
        return res.redirect('/login')
      }
      const decodedata= jwt.verify(token,process.env.SECRET_KEY);  
  
      const user = await User.findOne({_id:decodedata.id})
    
      jwt.verify(token,process.env.SECRET_KEY, (err, user1) => {
        if (err) {
          return res.status(403).send('Invalid token');
        }
        req.user =user;
        next();
      });
    } catch (error) {
      return res.redirect('/login')    }
  }

module.exports = authenticateToken;