'use strict';

var util = require('util');

module.exports = function (req, opts) {
  var code = [];

  code.push(util.format('curl --request %s', req.method));

  code.push(util.format('--url "%s"', req.url));

  if (req.httpVersion === 'HTTP/1.0') {
    code.push('--http1.0');
  }

  // construct cookies argument
  if (req.cookies && req.cookies.length) {
    var cookies = req.cookies.map(function (cookie) {
      return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
    });

    code.push(util.format('--cookie "%s"', cookies.join('; ')));
  }

  if (req.headers && req.headers.length) {
    req.headers.map(function (header) {
      code.push(util.format('--header "%s: %s"', header.name, header.value));
    });
  }

  if (req.postData) {
    code.push('--data ' + JSON.stringify(req.postData.text));
  }

  return code.join(' \\\n     ');
};
