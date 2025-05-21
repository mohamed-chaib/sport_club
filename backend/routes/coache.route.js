import express  from 'express'
import Coache from '../models/coache.model.js';
import { protectRoute,adminRoute } from '../middlewear/auth.middlewear.js';
const router = express.Router()
router.post('/planifierEntrinement',protectRoute,Coache.planifierEntrinement);
export default router;