import express  from 'express'
import Admin from '../models/admin.model.js';
import { protectRoute,adminRoute } from '../middlewear/auth.middlewear.js';
const router = express.Router()

router.post('/ajouterStaff'  ,protectRoute,adminRoute,Admin.ajouterStaff)
router.post('/ajouterManager',protectRoute,adminRoute,Admin.ajouterManager)
router.post('/ajouterJoueur' ,protectRoute,adminRoute,Admin.ajouterJoueur)
router.post('/ajouterCoache' ,protectRoute,adminRoute,Admin.ajouterCoache)
router.delete('/supprimerMember/:id' ,protectRoute,adminRoute,Admin.supprimerMember)
router.post("/ajouterEquipe", Club.ajouterEquipe);

export default router;