import dotenv from 'dotenv'
dotenv.config()

import express, { NextFunction, Request, Response } from 'express'
import path from 'path'
import * as OpenApiValidator from 'express-openapi-validator'
import { ValidationError, ValidationErrorItem } from 'express-openapi-validator/dist/framework/types'
import winston from 'winston'
import expressWinston from 'express-winston'

const app = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: false,
    // msg: 'HTTP {{req.method}} {{req.url}} -- {{res.statusCode}} {{res.responseTime}} {{Date.now()}}',
    colorize: true
}))

app.use(
    OpenApiValidator.middleware({
        apiSpec: './src/spec.yaml',
        validateRequests: true,
        validateResponses: true,
        operationHandlers: path.join(__dirname + '/controllers')
    })
)

app.use((err: ValidationError, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({
        error: err
    })
})

app.listen(process.env.PORT, () => {
    // tslint:disable-next-line: no-console
    console.log('Server started');
})