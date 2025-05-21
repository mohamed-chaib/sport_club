import express  from 'express'
import { protectRoute } from '../middlewear/auth.middlewear.js';
import Entrinement from '../models/entrinement.model.js';

const router = express.Router()


router.get('/',protectRoute,Entrinement.getAllEntrinement);

export default router;