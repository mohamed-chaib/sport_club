import express  from 'express'
import {getAllMembers, login,logout, refreshToken} from '../controllers/membre.controller.js';
import { protectRoute } from '../middlewear/auth.middlewear.js';

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.get('/',protectRoute,getAllMembers);
router.post("/refresh-token",refreshToken);

export default router;