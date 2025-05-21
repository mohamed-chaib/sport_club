import express  from 'express'
import Manager from '../models/manager.model.js';
import Admin from '../models/admin.model.js';

import { protectRoute} from '../middlewear/auth.middlewear.js';
const router = express.Router()

router.post('/organiserMatch',protectRoute,Manager.organiserMatch)
router.post('/organiserTournoi',protectRoute,Manager.organiserTournoi)
router.post('/recruterStaff'  ,protectRoute,Admin.ajouterStaff)
router.post('/recruterJoueur' ,protectRoute,Admin.ajouterJoueur)
router.post('/recruterCoache' ,protectRoute,Admin.ajouterCoache)
export default router;
