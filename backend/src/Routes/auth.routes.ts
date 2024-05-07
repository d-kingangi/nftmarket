import { Router } from "express";
import { login_nftmarket_user, reset_nftmarket_user_password, logout_nftmarket_user } from "../Controllers/auth.controller";
import { verifyToken } from "../Middlewares/token";

const authRouter = Router()

authRouter.post('/login', login_nftmarket_user)
// authRouter.get('/checkdetails', verifyToken, checkUserDetails)
authRouter.put('/resetPassword', reset_nftmarket_user_password)
authRouter.post('/logout', verifyToken, logout_nftmarket_user);


export default authRouter 