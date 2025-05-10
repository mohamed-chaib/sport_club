import express  from 'express'
import Member from '../models/membre.model.js';
 
const router = express.Router()

router.get('/login',Member.login)
export default router;