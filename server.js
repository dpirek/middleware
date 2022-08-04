
const middleware = require('./middleware');
const app = middleware(8071);

app.use(function(req, res, next) {

  // Do one thing.
  next();
});

app.use(function(req, res, next) {

  // Do another thing with delay.
  setTimeout(function() {
    next();
  }, 500);
});

app.get('/test', (req, res) => {

  // Route.
  res.end('helo world');
});
