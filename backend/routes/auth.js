import express from 'express';
const router = express.Router();
import { register,login } from '../controllers/authController.js';


//Register Route

router.post("/register", register);

// Login Route
router.post("/login", login);


export default router;