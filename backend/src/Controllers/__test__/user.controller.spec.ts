

// user controller test file

//test  for controller function create_nftmarket_user()

import mssql from 'mssql'
import { create_nftmarket_user, get_single_nftmarket_user, get_all_nftmarket_users, update_nftmarket_user, delete_nftmarket_user } from '../user.controller'


describe('Account created successfully', ()=>{

    let res: any

    beforeEach(()=>{
      res={
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis()
      }
    })

    it('Succesfully creates user', async () => {
        const req = {
            body:{
                user_id: 'user_123',
                wallet_address: 'user_123',
                profile_img: 'user_123',
                user_name: 'user_123',
                email: 'user_123',
                location : 'user_123',
                phone: 'user_123',
                password: 'user_123'
            }
        }

        const mockedInput = jest.fn().mockReturnThis() 

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
          }
      
          jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)
      
          await create_nftmarket_user(req as any, res)
      
          expect(res.json).toHaveBeenCalledWith({message: "Account created successfully"})

    })
})


//test for controller function get_all_nftmarket_users()

describe('Gets all users', ()=>{

    let res: any
    let req: any

    beforeEach(()=>{
        req={
            body:{}
        }
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Successfuly gets all users', async()=>{
        const mockedResult = [
            {
                user_id: 'user_123',
                wallet_address: 'user_123',
                profile_img: 'user_123',
                user_name: 'user_123',
                email: 'user_123',
                location : 'user_123',
                phone: 'user_123',
                password: 'user_123'
            },
            {
                user_id: 'user_123',
                wallet_address: 'user_123',
                profile_img: 'user_123',
                user_name: 'user_123',
                email: 'user_123',
                location : 'user_123',
                phone: 'user_123',
                password: 'user_123'
            }.
            {
                user_id: 'user_123',
                wallet_address: 'user_123',
                profile_img: 'user_123',
                user_name: 'user_123',
                email: 'user_123',
                location : 'user_123',
                phone: 'user_123',
                password: 'user_123'
            }
        ]

        const mockedInput = jest.fn().mockReturnThis() 

        const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult })

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await get_all_nftmarket_users(req as any, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ users: mockedResult });
    })
})



//test for controller function get_single_nftmarket_user()

describe('Gets single user', ()=>{

    let req: any
    let res: any

    beforeEach(()=>{
        req = {
            params: {
                user_id: '353545-43495835-458347575', 
            },
        };

        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    })

    it('Successful fetch for a single user', async () =>{
        const mockedResult = [
            {
                user_id: 'user_123',
                wallet_address: 'user_123',
                profile_img: 'user_123',
                user_name: 'user_123',
                email: 'user_123',
                location : 'user_123',
                phone: 'user_123',
                password: 'user_123'
            }
        ]

        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult [0] })

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await get_single_nftmarket_user(req as any, res)

        expect(res.json).toHaveBeenCalledWith({ error: "An error occurred while fetching member." });

    })
})

//test for controller function  update_nftmarket_user()

describe('Account updated successfully', ()=>{

    let res: any
    let req: any

    beforeEach(()=>{
        req={
            params:{
                user_id : '353545-43495835-458347575'
            }
        }
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Successfully updates account'. async () => {
        const req={
            body:{
                username: "anyciaa"
            }
        }

        const mockedInput = jest.fn().mockReturnThis() 

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        await update_nftmarket_user(req as any, res);

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        expect(res.json).toHaveBeenCalledWith({message: "Account updated successfully"})


    })
})


//test for controller function delete_nftmarket_user()

describe('Account deleted succesfully', ()=>{

    let res: any
    let req: any

    beforeEach(()=>{

        req={
            params:{
                user_id: '353545-43495835-458347575'
            }
        }
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Successsfully deletes account', async()=>{
        
        const req={body:{}}

        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await delete_nftmarket_user(req as any, res)

        expect(res.json).toHaveBeenCalledWith({message: "Account deleted successfully"})
    })
})
