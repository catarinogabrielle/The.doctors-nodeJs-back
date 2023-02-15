"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const routes_1 = require("./routes");
var privateKey = fs_1.default.readFileSync('/etc/ssl/private/private.key', 'utf8');
var certificate = fs_1.default.readFileSync('/etc/ssl/certificate.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };
const app = express_1.default();
app.use((req, res, next) => {
    if (req.originalUrl === '/webhooks') {
        next();
    }
    else {
        express_1.default.json()(req, res, next);
    }
});
app.use(cors_1.default());
app.use(routes_1.router);
app.use("/files", express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
var httpsServer = https_1.default.createServer(credentials, app);
httpsServer.listen(8443);
//app.listen(3333, () => console.log('Servidor online'))
