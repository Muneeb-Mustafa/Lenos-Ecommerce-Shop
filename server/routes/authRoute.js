import express from "express"   
import {login, register,forgetPassword,  test, updateProfile} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/forget-password', forgetPassword)
router.put('/update-profile', requireSignIn, updateProfile)
router.get('/test', requireSignIn, isAdmin, test)


export default router;


