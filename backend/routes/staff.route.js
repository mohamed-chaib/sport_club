import express  from 'express'
import Staff from '../models/staff.model.js';
import { protectRoute } from '../middlewear/auth.middlewear.js';
const router = express.Router()
router.post('/ajouterDossierMedical',protectRoute,Staff.ajouterDossierMedical);
router.get('/getAllDossierMedical',protectRoute,Staff.getAllDossierMedical);
export default router;