import { Router } from "express";
import { create_nftmarket_mint, get_all_nftmarket_mints, get_all_nftmarket_mints_for_seller, delete_nftmarket_mint } from "../Controllers/mints.controller";
import { verifyToken } from "../Middlewares/token";

const mintRouter = Router()

mintRouter.post('/create', verifyToken, create_nftmarket_mint)
mintRouter.get('/', get_all_nftmarket_mints)
mintRouter.get('/', get_all_nftmarket_mints_for_seller)
mintRouter.delete('/delete', verifyToken, delete_nftmarket_mint)

export default mintRouter
