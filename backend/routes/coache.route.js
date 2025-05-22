import express  from 'express'
import Coache from '../models/coache.model.js';
import { protectRoute,adminRoute, coacheRoute } from '../middlewear/auth.middlewear.js';
const router = express.Router()
router.post('/planifierEntrinement',protectRoute,coacheRoute,Coache.planifierEntrinement);
export default router;