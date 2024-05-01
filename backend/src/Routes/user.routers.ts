import { Router } from "express";
import { create_nftmarket_user, get_all_nftmarket_users, get_single_nftmarket_user, update_nftmarket_user, delete_nftmarket_user } from "../Controllers/user.controller";
import { verifyToken } from "../Middlewares/token";

const userRouter = Router()

userRouter.post('/create', create_nftmarket_user)
userRouter.get('/', get_all_nftmarket_users)
userRouter.get('/user_id', get_single_nftmarket_user)
userRouter.put('/user_id', verifyToken, update_nftmarket_user)
userRouter.delete('/delete/', verifyToken, delete_nftmarket_user)