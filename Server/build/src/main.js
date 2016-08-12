'use strict';

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _car = require('./car');

var _car2 = _interopRequireDefault(_car);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = _socket2.default.listen(_config2.default.server_port);

var carSpace = io.of('/car');
var clientSpace = io.of('/client');

(0, _car2.default)(carSpace, io);
(0, _client2.default)(clientSpace, io);