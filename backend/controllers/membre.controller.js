import Admin from "../models/admin.model.js";
import Coache from "../models/coache.model.js";
import Joueur from "../models/joueur.model.js";
import Manager from "../models/manager.model.js";
import Member from "../models/membre.model.js";
import Staff from "../models/staff.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import redis from "../config/redis.js";
dotenv.config();

export const login = async function (req, res) {
    try {
      const { email, password } = req.body;
      const member = await Member.findOne({
         where : {email:email},
        })
      if (member && (await bcrypt.compare(password,member.password))) {
        // generate tokens and store it 
        const {accessToken,refreshToken} = generateTokens(member.id , member.role)
        setCookies(res,accessToken,refreshToken);
        storeRefreshToken(member.id,refreshToken);

        const  details = await getDetails(member.role,member.id)
        return res.status(200).json({
          message: 'Log In Succesful',
          member:{
            id:member.id,
            nom:member.nom,
            prenom : member.prenom,
            email : member.email,
            role: member.role,
            details
           
          },

      });
      }
      else{
        return res.status(400).json({message:'Log In Unsuccesful'})
      }
      
      // const user
    } catch (error) {
      console.log('error in :  login controller : ' +error.message)
      return res.status(500).json({message:"Server Error ", error:error.message})
    }
  };
  export const logout =async function(req,res){
    try{
      const refreshToken = req.cookies.refreshToken;
      if (refreshToken) {
      const payload = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
      await redis.del(`refreshToken:${payload.id}`);
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      res.status(200).json({message :'Log out Succesful'})

    }else{
      res.status(401).json({message :'Unauthorized'})
    }
    }
    catch(error){
      console.log('error in :  log out controller : ' +error.message)
      return res.status(500).json({message:"Server Error", error:error.message})
    }
  }

  
   const   getDetails = async function(role,id){
    try{
      switch (role) {
      
        case 'admin':
          return  await Admin.findOne({ where: { admin_id: id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
          break;
        case 'staff':
          return await Staff.findOne({ where: { staff_id: id }, attributes: { exclude: ['createdAt', 'updatedAt','staff_id'] } });
          break;
        case 'joueur':
          return await Joueur.findOne({ where: { joueur_id: id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
          break;
        case 'manager':
          return  await Manager.findOne({ where: { manager_id: id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
          break;
        case 'coache':
          return await Coache.findOne({ where: { coache_id: id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
          break;
      }
    }catch(err){
      console.log("there is an error "+err.message)
    }
  }
  export const   getAllMembers = async (req,res)=>{
    try {
      const role = req.query.role;
      const members = await Member.findAll({
        where: role ? { role } : undefined, 
        include:[
          {model : Joueur },
          {model : Coache },
          {model : Staff },
          {model : Manager },
        ],
        attributes:{exclude :['password']}
        
      })
      return res.status(200).json(members)
    } catch (error) {
      
    }
  }

// function to generate tokens
const generateTokens = function (memberId,role){
   const accessToken = jwt.sign({memberId},process.env.ACCESS_TOKEN_SECRET,{expiresIn :'30m'})
   const refreshToken = jwt.sign({memberId},process.env.REFRESH_TOKEN_SECRET,{expiresIn :'7d'})
   return {accessToken,refreshToken}
}
// set the tokens in the coookies
const setCookies = function(res, accessToken , refreshToken){
res.cookie('accessToken',accessToken,{
  httpOnly :true, // prevents xss atack
  secure : process.env.NODE_ENV === 'Production', // use https only
  sameSite : 'strict', // prevents csrf attack
  maxAge : 15*60*1000  // 15min
})
res.cookie('refreshToken',refreshToken,{
  httpOnly :true, // prevents xss atack
  secure : process.env.NODE_ENV === 'Production', // use https only
  sameSite : 'strict', // prevents csrf attack
  maxAge : 7*24*60*60*1000  // 7 days
})

}
const storeRefreshToken=async  function(memberID,refreshToken){
  try {
    await redis.set(
      `refreshToken:${memberID}`
      ,refreshToken,
      'EX',
      7*24*60*60
    );
  } catch (error) {
    console.log('error in storeRefresh Token : '+error.message)
    
  }

 
}

export const refreshToken = async (req, res) => {
  try {
      const refreshToken = req.cookies.refreshToken
      if (!refreshToken) {
          return res.status(401).json({message : "Unauthorized"})
      }
      const decoded =  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
      const storedToken = await redis.get(`refreshToken:${decoded.memberId}`);
      

      if (refreshToken!==storedToken) {
          return res.status(401).json({message : "Invalid refresh token "})
      }
      const accessToken = jwt.sign({memberId : decoded.memberId},process.env.ACCESS_TOKEN_SECRET,{expiresIn : "15m"});
      res.cookie("accessToken",accessToken,{
          httpOnly : true,
          secure : process.env.NODE_ENV==="Production",
          samesite : "strict",
          maxAge: 15*60*1000
      })
      res.status(200).json({message : "Refresh token successful "})
  } catch (error) {
    console.log("error in refresh token controller : " + error.message);

    res.status(500).json({ message: "server error" ,error: error.message });
  }
};