import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mssql from 'mssql'
import { login_nftmarket_user } from '../auth.controller'
import { Request } from 'express'
import { ResponseError } from 'web3'

describe('Login Tests', ()=>{

    let res: any

    beforeEach(()=>{
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis
        }
    })

    it('Successfully logs-in a user and returns a token', async () => {
        let expected_user={
            email:"example@mail.com",
            password:"random_user_1"
        }

        const req ={
            body:{
                email: expected_user.email,
                password: expected_user.password
                // password: "correctPassword"
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: [expected_user]})
        }as never)

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never)

        jest.spyOn(jwt, 'sign').mockReturnValueOnce('generated-token-ijdgfsgfoia-djfgkjkjg-dsfjgfds' as never)

        await login_nftmarket_user(req as Request, res )

        expected(res.json).toHaveBeenCalledWith({
            message: "Logged in Successfully",
            token: 'generated-token-ijdgfsgfoia-djfgkjkjg-dsfjgfds'
        })
    })

    test('Returns a validation erroe is email or password is missing', async () => {
        const req = {
            body:{}
        }

        await login_nftmarket_user(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({
            "error": "\"email\" is required"
        })
    })

    it('Returns a validation error if email or password is empty', async()=>{
        const req ={
            body: {
                email: "",
                password: ""
            }
        }

        await login_nftmarket_user(req as Request, res)

        expect(res.json).toHaveBeenLastCalledWith({
            "error": "\"email\" is not allowed to be empty"
        }) 
    })

    it('Returns an error if email is not in database', async()=>{
        const req={
            body:{
                email: 'incorrect@gmail.com',
                password: '12345678'
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: []})
        } as never)

        await login_nftmarket_user(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({
            "error": "User not found"
        }) 
    })

    it("Handles incorrect password scenarion", async()=>{
        const req={
            body:{
                email: 'correct@gmail.com',
                password: 'wrongPassword'
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: [
                {
                    email: 'correct@gmail.com', 
                    password: 'hashedpwd-38698bf-fdnbnfdbnbdiiiyifds'
                }
            ]})
        } as never)

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never)

        await login_nftmarket_user(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({
            "error": "Incorrect password"
        }) 

    })
})