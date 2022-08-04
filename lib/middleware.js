const http = require('http');

function createApplication(port) {

  let list = [];
  let routes = [];

  const server = http.createServer((req, res) => {

    let index = 0;

    function next() {
      index++;
      if(index === list.length) {

        routes.map(route => {
          if(route.url === req.url) {
            route.f(req, res);
          }
        });

      }
    }

    list.map((f, i) => {
      f(req, res, next);
    });

  }).listen(port);

  return {
    use: function(f) {
      list.push(f)
    },
    get: function(url, f) {
      routes.push({
        url,
        f
      });
    }
  };
}

module.exports = createApplication;
