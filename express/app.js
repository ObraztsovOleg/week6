import Router from './bird/index.js';

export default (express, bodyParser, createReadStream, crypto, http) => {
  const app = express();
  const hu = {
    "Content-Type": "text/html; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, OPTIONS, DELETE"
  };


  app
    .use((req, res, n) => res.set(hu) && n())
    .use(bodyParser.urlencoded({ extended: true }))
    // .use(express.urlencoded({extended: true}))
    .use('/', Router(express, bodyParser, createReadStream, crypto, http))
    .all('*', (req, res) => {
      res
      .status(404)
      .end('olegrasputina');
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
