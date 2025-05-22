import express  from 'express'
import Staff from '../models/staff.model.js';
import { protectRoute, staffRoute } from '../middlewear/auth.middlewear.js';
const router = express.Router()
router.post('/ajouterDossierMedical',protectRoute,staffRoute,Staff.ajouterDossierMedical);
router.get('/getAllDossierMedical',protectRoute,staffRoute,Staff.getAllDossierMedical);
export default router;