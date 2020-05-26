var routes = require('express').Router();
var path = require('path');

routes.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname, '../public'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    res.sendFile('index.html', options, );
})

routes.get('/:filename'), (req, res) => {
    var options = {
        root: path.join(__dirname, '../public'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    res.sendFile('index.html', options, );
}

module.exports = routes;