import express  from 'express'
import {getAllMembers, login,logout} from '../controllers/membre.controller.js';
import { protectRoute } from '../middlewear/auth.middlewear.js';

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.get('/',protectRoute,getAllMembers);

export default router;