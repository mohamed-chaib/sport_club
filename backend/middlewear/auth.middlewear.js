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

export const managerRoute = async function (req,res,next){
    try {
        if (req.member && req.member.role==='manager') {
            next()
        }
        else{
            return res.status(403).json({message:'Access denied  - Manager Only'})
        }
    } catch (error) {
        console.log("error in managerRoute middleware : " + error.message);
        res.status(500).json({ message: error.message });
    }
}

export const coacheRoute = async function (req,res,next){
    try {
        if (req.member && req.member.role==='coache') {
            next()
        }
        else{
            return res.status(403).json({message:'Access denied  - Coache Only'})
        }
    } catch (error) {
        console.log("error in coacheRoute middleware : " + error.message);
        res.status(500).json({ message: error.message });
    }
}

export const staffRoute = async function (req,res,next){
    try {
        if (req.member && req.member.role==='staff') {
            next()
        }
        else{
            return res.status(403).json({message:'Access denied  - Staff Only'})
        }
    } catch (error) {
        console.log("error in staffRoute middleware : " + error.message);
        res.status(500).json({ message: error.message });
    }
}