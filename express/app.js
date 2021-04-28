import Router from './bird/index.js';

export default (express, bodyParser, createReadStream, crypto, http) => {
  const app = express();
  const login = 'olegrasputina';
  const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Access-Control-Allow-Headers',
    'Content-Type': 'text/plain; charset=utf-8'
};


  app
    .use((req, res, n) => res.set(CORS) && n())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    // .use(express.urlencoded({extended: true}))
    .use('/', Router(express, bodyParser, createReadStream, crypto, http))
    .all('/*', (req, res) => {
      res
      .send(login);
    });

  return app;
}
  
// const s = http.Server((req, res) => {
//       if (req.url === '/req/') {
//         res.writeHead(200, {"Content-Type": "text/html; charset=utf-8", ...CORS})
//         res.write('nahuy')
//       }
//     });
// s.listen(1234);


/*

для варианта с type="module"

import { Server } from 'http';
import x from 'express';

и в предпоследней строке

export default Server(app)

*/
