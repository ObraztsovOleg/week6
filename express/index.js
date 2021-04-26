import express from 'express';
import http from 'http';
import { createReadStream } from 'fs';
import crypto from 'crypto';
import bodyParser from 'body-parser';
import appSrc from './app.js';

const PORT = 4321;

const app = appSrc(express, bodyParser, createReadStream, crypto, http);
app.listen(process.env.PORT || PORT, () => console.log(process.env.PORT || PORT));

/*

для варианта с type="module"

import { Server } from 'http';
import x from 'express';

и в предпоследней строке

export default Server(app)

*/
