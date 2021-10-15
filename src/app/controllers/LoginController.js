const { hash } = require("bcryptjs");
const jwt = require('jsonwebtoken');
var {ObjectId} = require("mongodb")
const User = require("../models/User")
const Session = require("../models/Session")

module.exports = {
  async create(req,res){
    try {
    let { email, password} = req.body;
      password = await hash(password.trim(), 6);

      const user = {
        email,
        password,
        createdAt: new Date(),
      };

      await User.insertOne(user)
      return res.json({ success: "Login created" });

    } catch (error) {
      console.error(
        `[LoginController - create] error:`,error,
        );
      return res.status(500).json({
        message: error
     });  
    }
  },
  async login(req,res){
    try {
      const {user} = req;
      console.log(`[LoginController - logout] user:`,user);
      const userId = new ObjectId(user._id).toString();
      let userSession = await Session.findOne({userId: userId});
      if(!userSession){
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
          expiresIn: 300 // expires in 5min
        });

        const sessionInfo = {
          userId,
          token: token,
        }
        
        await Session.insertOne(sessionInfo);
        userSession = sessionInfo;
      }

      delete userSession._id;
      return res.json(userSession);

    } catch (error) {
      console.error(
        `[LoginController - login] error:`,error,
        );
      return res.status(500).json({
        message: error
     });  
    }
  },
  async logout(req,res){
    try {
      const {user} = req;
      console.log(`[LoginController - logout] user:`,user);
      const userId = new ObjectId(user._id).toString();
      let userSession = await Session.findOne({ userId });
      if(userSession){
        await Session.deleteOne( userSession._id );
      }

      return res.json({ token: null });

    } catch (error) {
      console.error(
        `[LoginController - logout] error:`,error,
        );
      return res.status(500).json({
        message: error
     });  
    }
  }
};