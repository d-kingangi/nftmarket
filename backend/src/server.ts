import express, { json, Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import { sqlConfig } from './Config/sql.config';
import mssql, { ConnectionPool } from 'mssql';
import cors from 'cors';
import tradeRoute from './Routes/trade.routes';
import userRouter from './Routes/user.routers';
import mintRouter from './Routes/mint.routes';
import authRouter from './Routes/auth.routes';
import http from 'http'
// import {Server} from 'socket.io'

const multer  = require('multer')

const app = express();
dotenv.config();

app.use(json());
app.use(cors());

app.use('/user', userRouter)
app.use('/mint', mintRouter)
app.use('/auth', authRouter)
app.use('/trade', tradeRoute)

const PORT = process.env.PORT as string;

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        error
    })
})


mssql.connect(sqlConfig, (err?: Error, connect?: ConnectionPool, req?: Request, res?: Response) => {
    if (err) {
        res?.status(500).json({
            err
        })
    } else if (connect) {
        console.log("connected to mssql db");
        const PORT = process.env.PORT
        server.listen(PORT, () => {
            console.log('App is listening on port', PORT);
        })
    }
})