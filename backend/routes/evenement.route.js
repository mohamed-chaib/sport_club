import express  from 'express'
import { protectRoute } from '../middlewear/auth.middlewear.js';
import { getAllEvenements } from '../controllers/evenement.controller.js';

const router = express.Router()


router.get('/',protectRoute,getAllEvenements);

export default router;