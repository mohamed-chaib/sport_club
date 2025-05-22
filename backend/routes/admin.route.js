import express  from 'express'
import Admin from '../models/admin.model.js';
import { protectRoute,adminRoute } from '../middlewear/auth.middlewear.js';
import Club from '../models/club.model.js';
const router = express.Router()

router.post('/ajouterStaff'  ,protectRoute,adminRoute,Admin.ajouterStaff)
router.post('/ajouterManager',protectRoute,adminRoute,Admin.ajouterManager)
router.post('/ajouterJoueur' ,protectRoute,adminRoute,Admin.ajouterJoueur)
router.post('/ajouterCoache' ,protectRoute,adminRoute,Admin.ajouterCoache)
router.delete('/supprimerMember/:id' ,protectRoute,adminRoute,Admin.supprimerMember)
router.patch("/modifierStaff/:id",protectRoute, adminRoute,Admin.updateStaff);
router.patch("/modifierCoache/:id",protectRoute, adminRoute,Admin.updateCoache);
router.patch("/modifierManager/:id",protectRoute, adminRoute,Admin.updateManager);
router.patch("/modifierJoueur/:id",protectRoute, adminRoute,Admin.updateJoueur);


router.post("/ajouterEquipe",protectRoute, adminRoute,Club.ajouterEquipe);

export default router;