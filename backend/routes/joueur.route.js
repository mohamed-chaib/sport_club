import express  from 'express'
import Joueur from '../models/joueur.model.js';

import { protectRoute} from '../middlewear/auth.middlewear.js';
const router = express.Router()

export default router;
