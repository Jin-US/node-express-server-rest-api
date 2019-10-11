"use strict";

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _models = _interopRequireDefault(require("./models"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); // Application-Level Middleware

app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  req.context = {
    models: _models.default,
    me: _models.default.users[1]
  };
  next();
}); // Routes

app.use('/session', _routes.default.session);
app.use('/users', _routes.default.user);
app.use('/messages', _routes.default.message); // Start

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Hello world listening on port', port);
});