import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Member from '../models/membre.model.js'
dotenv.config()
export const protectRoute = async function (req,res,next){
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
        return res.status(400).json({message :"Unothorized  - No Token provided"})
    }
    const payload = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    const member = await Member.findByPk(payload.memberId,
        {
        attributes:{exclude:['password']}
    })

    if (!member) {
        return res.status(400).json({message :"Unothorized  - Invalid Access Token"})
    }

    req.member=member
    console.log(member)
    next()

}
export const adminRoute = async function (req,res,next){
    try {
        if (req.member && req.member.role==='admin') {
            next()
        }
        else{
            return res.status(403).json({message:'Access denied  - Admin Only'})
        }
    } catch (error) {
        console.log("error in adminRoute middleware : " + error.message);
        res.status(500).json({ message: error.message });
    }
    
}