import { Router } from "express";
import { create_nftmarket_trade, get_nftmarket_trades_for_buyer, get_nftmarket_trades_for_collection, get_nftmarket_trades_for_project, update_nftmarket_trade, delete_nftmarket_trade } from "../Controllers/trade.controller";
import { verifyToken } from "../Middlewares/token";


const tradeRoute = Router()

tradeRoute.post('/create', verifyToken, create_nftmarket_trade)
tradeRoute.get('/collection', get_nftmarket_trades_for_collection)
tradeRoute.get('/project', get_nftmarket_trades_for_project)
tradeRoute.get('/buyer', verifyToken, get_nftmarket_trades_for_buyer)
tradeRoute.put('/update', verifyToken, update_nftmarket_trade)
tradeRoute.delete('/delete', verifyToken, delete_nftmarket_trade)

export default tradeRoute
