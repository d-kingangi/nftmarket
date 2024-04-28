import mssql from 'mssql';
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import {v4} from 'uuid';
import { sqlConfig } from "../Config/sql.config";
import { nftmarket_user} from "../Interfaces/nftmarket_users.interface"
import {new_nftmarket_user} from "../Validators/user.validator"

export const create_nftmarket_user = async (req: Request, res: Response) => {
    try {
        const user_id = v4
        
        const {wallet_address, profile_img, user_name, email, location, phone, password}: nftmarket_user = req.body

        let hashed_pwd = await bcrypt.hash(password, 8)

        let {error} = new_nftmarket_user.validate(req.body)

        if(error){
            return res.status(400).json({
                error: error
            })
        }

        const pool = await mssql.connect(sqlConfig)

        let result = await(await pool.request()
        .input("user_id", mssql.VarChar, )
        .input("wallet_address", mssql.VarChar, )
        .input("profile_img", mssql.VarChar, )
        .input("user_name", mssql.VarChar, )
        .input("email", mssql.VarChar, )
        .input("location", mssql.VarChar, )
        .input("phone", mssql.VarChar, )
        .input("password", mssql.VarChar, )
        .execute('create_nftmarket_user')).rowsAffected

        console.log(result);
        
        return res.json({
            message:"Account created successfully",
        })

    } catch (error) {
        return res.status(500).json({error: error})
    }
}



export const get_all_nftmarket_users = async (req: Request, res:Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        const all_nftmarket_users = (await pool.request().execute('get_all_nftmarket_users')).recordset

    } catch (error) {
        return res.json({error})
    }
}


export const get_single_nftmarket_user = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.id

        const pool = await mssql.connect(sqlConfig)
        
        let nftmarket_user = (await pool.request().input("user_id", user_id).execute('get_single_nftmarket_user')).recordset

        return res.status(200).json({
            nftmarket_user
        })

    } catch (error) {
        return res.json({error})
    }
}


export const update_nftmarket_user = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.id

        const {wallet_address, profile_img, user_name, email, location, phone, password}: nftmarket_user = req.body

        const pool = await mssql.connect(sqlConfig)

        let result = await(await pool.request()
        .input("user_id", mssql.VarChar, )
        .input("wallet_address", mssql.VarChar, )
        .input("profile_img", mssql.VarChar, )
        .input("user_name", mssql.VarChar, )
        .input("email", mssql.VarChar, )
        .input("location", mssql.VarChar, )
        .input("phone", mssql.VarChar, )
        .input("password", mssql.VarChar, )
        .execute('create_nftmarket_user')).rowsAffected

        console.log(result);

        return res.json({
            message: "Account updated successfully"
        })

    } catch (error) {
        
    }
}

export const delete_nftmarket_user = async (req: Request, res: Response) => {
    try{
        const user_id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("user_id", mssql.VarChar, user_id)
        .execute('delete_nftmarket_user')).rowsAffected 

        if(result[0] == 0){
            return res.status(201).json({
                error: "Account not found"
            })
        }else{
            return res.json({
                message: "Account deleted successfully"
            })
        }

    } catch (error) {
        return res.json({error})
    }
}