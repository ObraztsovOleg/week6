export default (express, bodyParser, createReadStream, crypto, http) => {
    const router = express.Router();

    router
      .route('/login/')
      .get(r => r.res.end('olegrasputina'));

    router
      .route('/code/')
      .get(r => createReadStream(import.meta.url.substring(7)).pipe(r.res));

    router
        .route('/sha1/:input')
        .get(function(r) {
            let sha = crypto.createHash('sha1', r.params.input);
            r.res.end(sha.digest('hex')); 
        });

    router
        .route('/req/')
        .all(function(req, res) {
            execute_get(req.query.addr || req.body.addr);
            
          function execute_get(addr) {
            http
              .get(addr, function(rs) {
                  var bodyChunks = [];
                  rs
                  .on('data', function(chunk) {
                    bodyChunks.push(chunk);
                  })
                  .on('end', function() {
                    var body = Buffer.concat(bodyChunks);
                    res.end(body);
                  });
              });
          } 
        });
        
    return router;
}

