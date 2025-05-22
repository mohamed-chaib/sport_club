import express  from 'express'
import Manager from '../models/manager.model.js';
import Admin from '../models/admin.model.js';

import { managerRoute, protectRoute} from '../middlewear/auth.middlewear.js';
const router = express.Router()

router.post('/organiserMatch',protectRoute,managerRoute,Manager.organiserMatch)
router.post('/organiserTournoi',protectRoute,managerRoute,Manager.organiserTournoi)
router.post('/recruterStaff'  ,protectRoute,managerRoute,Admin.ajouterStaff)
router.post('/recruterJoueur' ,protectRoute,managerRoute,Admin.ajouterJoueur)
router.post('/recruterCoache' ,protectRoute,managerRoute,Admin.ajouterCoache)
export default router;
