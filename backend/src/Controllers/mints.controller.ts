import mssql from 'mssql';
import { Request, Response } from "express";
import {v4} from 'uuid';
import { sqlConfig } from "../Config/sql.config";
import { nftmarket_mint} from "../Interfaces/nftmarket_mints.interface"
import { new_nftmarket_mint} from "../Validators/mint.validator"

export const create_nftmarket_mint = async (req: Request, res: Response) => {
    try {
        const unique_mint_id = v4()

        const {blockchain, project, version, block_time, token_id, collection, amount_usd, token_standard, trade_type, number_of_items, trade_category, evt_type, 
            seller, buyer, amount_original, amount_raw, currency_symbol, currency_contract, nft_contract_address, project_contract_address, aggregator_name, aggregator_address, block_number, 
            tx_hash, tx_from, tx_to} = req.body

        let {error} = new_nftmarket_mint.validate(req.body)

        if(error){
            return res.json({
                error: error
            })
        }

        const pool = await mssql.connect(sqlConfig)

        const result = (await pool.request()
            .input("unique_mint_id:", mssql.VarChar, unique_mint_id)
            .input("blockchain", mssql.VarChar, blockchain)
            .input("project", mssql.VarChar, project)
            .input("version", mssql.VarChar, version)
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
            .execute('create_nftmarket_mint')
            ).rowsAffected

        return res.status(200).json({
            message:"Mint created successfully",
        })
        
    } catch (error) {
        return res.json({error})
    }
}

export const get_all_nftmarket_mints = async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        const all_nft_market_mints = (await pool.request().execute("get_all_nftmarket_mints")).recordset;

        return res.json({
            mints: all_nft_market_mints 
        })
    } catch (error) {
        return res.json({error})
    }
}

export const get_all_nftmarket_mints_for_seller = async (req: Request, res: Response) => {
    try{
        const seller = req.params.seller

        const pool = await mssql.connect(sqlConfig)

        const result = (await pool.request()
        .input("seller", seller)
        .execute('get_all_nftmarket_mints_for_seller')).recordset

        let mints = result

    }  catch (error) {
        return res.json({error})
    }
}

// export const update_nftmarket_mint = async (req: Request, res: Response) => {
//     try {
        
//     } catch (error) {
//         return res.json({error})
//     }
// }

export const delete_nftmarket_mint = async (req: Request, res: Response) => {
    try {
        const { unique_mint_id } = req.params;

        const pool = await mssql.connect(sqlConfig)

        await pool.request()
            .input("unique_mint_id", mssql.VarChar, unique_mint_id)
            .execute('delete_nftmarket_mint');

        return res.json({ message: 'Mint deleted successfully' });
    } catch (error) {
        return res.json({ error });
    }
}