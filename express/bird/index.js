export default (express, bodyParser, createReadStream, crypto, http) => {
  const router = express.Router();
  const login = 'olegrasputina';

  router
    .route('/login/')
    .get(r => r.res.end(login));

  router
    .route('/code/')
    .get(r => createReadStream(import.meta.url.substring(7)).pipe(r.res));

  router
      .route('/sha1/:input')
      .get(function(r) {
          const sha = crypto.createHash('sha1')
          .update(r.params.input)
          .digest('hex');
          
          r.res.send(sha);
      });

  router
      .route('/req/')
      .all(function(req, res) {
        const url = req.query.addr || req.body.addr;
        if (url) {
          execute_get(url);
        } else {
          res.send(login);
        }
          
        function execute_get(addr) {
          http
            .get(addr, function(response) {
                let bodyChunks = '';
                response
                .on('data', function(chunk) {
                  bodyChunks += chunk;
                })
                .on('end', () => res.send(bodyChunks));
            });
        } 
      });
      
  return router;
}

