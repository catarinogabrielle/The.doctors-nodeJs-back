import express, { Request, Response, NextFunction } from "express"
import 'express-async-errors'
import cors from 'cors'
import path from 'path'
import https from 'https'
import fs from 'fs'

import { router } from './routes';

var privateKey = fs.readFileSync('/etc/ssl/private/private.key', 'utf8');
var certificate = fs.readFileSync('/etc/ssl/certificate.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };

const app = express();

app.use((req, res, next) => {
    if (req.originalUrl === '/webhooks') {
        next();
    } else {
        express.json()(req, res, next)
    }
});
app.use(cors())

app.use(router);

app.use("/files", express.static(path.resolve(__dirname, '..', 'tmp')))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443);
//app.listen(3333, () => console.log('Servidor online'))
