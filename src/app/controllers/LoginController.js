const { hash } = require("bcryptjs");
const {ObjectId} = require("mongodb")
const { create: createToken, validate: validateToken } = require("../utils/manageToken");
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
      console.log(`[LoginController - login] user:`,user);
      const userId = new ObjectId(user._id).toString();
      const expirationToken = Number(process.env.JWT_EXPIRATION_IN);
      console.log(`[LoginController - login] expirationToken:`,expirationToken);
      
      
      let userSession = await Session.findOne({userId: userId});
      if(!userSession){
        const token = createToken({userId},expirationToken)
        
        const sessionInfo = {
          userId,
          token: token,
        }
        
        await Session.insertOne(sessionInfo);
        userSession = sessionInfo;
      }

      try {
        validateToken(userSession.token);
      } catch (error) {
        console.log(`[LoginController - login] updating token:`,user);
        const token = createToken({userId},expirationToken)
        await Session.updateOne({token}, userSession._id);
        userSession.token = token;
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