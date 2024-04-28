import mssql from 'mssql';
import { Request, Response } from "express";
import {v4} from 'uuid';
import { sqlConfig } from "../Config/sql.config";
import { nftmarket_trade } from '../Interfaces/nftmarket_trade.interface';
import { new_nftmarket_trade } from '../Validators/trade.validator';


export const create_nftmarket_trade = async (req: Request, res: Response) => {
    try {
        const {blockchain, project, version, block_date, block_month, block_time, token_id, collection, amount_usd, token_standard, trade_type, number_of_items, trade_category, evt_type, 
                seller, buyer, amount_original, amount_raw, currency_symbol, nft_contract_address, project_contract_address, aggregator_name, aggregator_address, block_number, 
                tx_hash, tx_from, tx_to, platform_fee_amount_raw, platform_fee_amount, platform_fee_amount_usd, platform_fee_percentage, royalty_fee_receive_address, royalty_fee_currency_symbol, 
                royalty_fee_amount_raw, royalty_fee_amount, royalty_fee_amount_usd} = req.body

        const existing_trade = await check_existing_trade ()

        if(existing_trade){
            return res.json({ error: " You've have an existing trade pending" });
        }

        const unique_trade_id = v4()

        const pool = await mssql.connect(sqlConfig);

        if(pool.connected){
            const result = (await pool.request()
            .input("unique_trade_id:", mssql.VarChar, unique_trade_id)
            .input("blockchain", mssql.VarChar, blockchain)
            .input("project", mssql.VarChar, project)
            .input("version", mssql.VarChar, version)
            .input("block_date", mssql.DATETIME, block_date)
            .input("block_month", mssql.DATETIME, block_month)
            .input("block_time", mssql.DATETIME, block_time)
            .input("token_id", mssql.VarChar, token_id)
            .input("collection", mssql.VarChar, collection)
            .input("amount_usd", mssql.MONEY, amount_usd)
            .input("token_standard", mssql.VarChar, token_standard)
            .input("trade_type", mssql.VarChar, trade_type)
            .input("number_of_items", mssql.BigInt, number_of_items)
            .input("evt_type", mssql.VarChar, evt_type)
            .input("seller", mssql.VarChar, seller)
            .input("buyer", mssql.VarChar, buyer)
            .input("amount_original", mssql.BigInt, amount_original)
            .input("amount_raw", mssql.BigInt, amount_raw)
            .input("currency_symbol", mssql.VarChar, currency_symbol)
            .input("nft_contract_address", mssql.VarChar, nft_contract_address)
            .input("project_contract_address", mssql.VarChar, project_contract_address)
            .input("aggregator_name", mssql.VarChar, aggregator_name)
            .input("aggregator_address", mssql.VarChar, aggregator_address)
            .input("block_number", mssql.BigInt, block_number)
            .input("tx_hash", mssql.VarChar, tx_hash)
            .input("tx_from", mssql.VarChar, tx_from)
            .input("tx_to", mssql.VarChar, tx_to)
            .input("platform_fee_amount_raw", mssql.BigInt, platform_fee_amount_raw)
            .input("platform_fee_amount", mssql.BigInt, platform_fee_amount)
            .input("platform_fee_amount_usd", mssql.Money, platform_fee_amount_usd)
            .input("platform_fee_percentage", mssql.Double, platform_fee_percentage)
            .input("royalty_fee_receive_address", mssql.VarChar, royalty_fee_receive_address)
            .input("royalty_fee_currency_symbol", mssql.VarChar, royalty_fee_currency_symbol)
            .input("royalty_fee_amount_raw", mssql.Double, royalty_fee_amount_raw)
            .input("royalty_fee_amount", mssql.Double, royalty_fee_amount)
            .input("royalty_fee_amount_usd", mssql.Money, royalty_fee_amount_usd)
            ).rowsAffected

            if (result[0] > 0) {
                return res.json({ message: "Trade Requested successfully" });
            } else {
                return res.json({ error: "Failed to request trade" });
            }
        }
        
    } catch (error) {
        return res.json({ error });
    }
}