import express  from 'express'
import { protectRoute } from '../middlewear/auth.middlewear.js';
import Equipe from '../models/equipe.model.js';
const router = express.Router()

router.get('/'  ,protectRoute,Equipe.getAllEquipes)



export default router;