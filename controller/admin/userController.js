const User = require("../../model/userModel/userSchema");
const task = require("../../model/taskModel/taskSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

index = async (req, res) => {
 try {
   const count = await task.findOne({user:req.user._id}).countDocuments()
   const data = req.user;
   res.render('index',{data,count})
 } catch (error) {
  res.json({status:500,message:"Something went wrong"});
 }
}


signUp = async (req, res) => {
  try {
      const { name, password,email } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, password: hashedPassword ,email});
      await user.save();
      res.redirect('/login');
        } catch (error) {
      res.json({status:500,message:"Something went wrong"});
    }
};

getSignUp = async (req, res) => {
  try {
    res.render('pages/auth/pages-signup')
  } catch (error) {
    res.json({status:500,message:"Something went wrong"});
  }
}


// -------------------------- LOGIN --------------------------

logIn = async (req, res) => {

  
  try {

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id },process.env.SECRET_KEY);
        res.cookie("token",token)
        res.redirect('/index');   
      } else {
        res.json({status:401,message:"Invalid username or password"});
      }
    } catch (error) {
      console.log(error);
      res.json({status:500,message:"Something went wrong"});
    }
    };

getLogIn = async (req, res) => {
  try {
    res.render('pages/auth/pages-login')
  } catch (error) {
   console.log(error.message) 
  }
}

logOut = async (req, res) => {
try {
  
    res.clearCookie("token")
    res.redirect('/login')
} catch (error) {
  console.log(error.emessage)
}
}















module.exports = {
    index,
    getSignUp,
    signUp,
    getLogIn,
    logIn,
    logOut,
  
}
