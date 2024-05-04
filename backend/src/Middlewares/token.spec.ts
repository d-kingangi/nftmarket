import {  Request, Response } from "express";
import jwt from 'jsonwebtoken';


let mockRequest = () =>{
    return {
        headers:{
            token: "valid_token_for_testing_dskjgjfls_fdsjgfdj_fjhggkfsakjh"
        }
    } 
}

let mockResponse = ()=>{
    return{
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
}

let mockNext = jest.fn()

describe('Testing this middleware', ()=>{
    let token: string;

    beforeAll(()=>{
        const data: login_nftmarket_user ={
            user_id: 'user123',
            wallet_address: 'user123',
            profile_img: 'user123',
            user_name: 'user123',
            email: 'user123',
            location : 'user123',
            phone: 'user123'
        }

        token = jwt.sign(data, process.env.SECRET as string)
    })

    it('should return 401 if no token is provided', async () => {
        const response = await request(app)
          .post('/api/verifyToken')
          .send({});
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('You do not have access');
      });

      it('should return 403 if token is invalid', async () => {
        const response = await request(app)
          .post('/api/verifyToken')
          .set('token', 'invalidtoken')
          .send({});
        expect(response.status).toBe(403);
        expect(response.body.error).toBe('Forbidden: Invalid token');
      });

      it('should return 200 if token is valid', async () => {
        const response = await request(app)
          .post('/api/verifyToken')
          .set('token', token)
          .send({});
        expect(response.status).toBe(200);
      });
    
})