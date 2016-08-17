'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

module.exports = function () {
    function Player(id, store, speed, client) {
        _classCallCheck(this, Player);

        this.id = id;
        this.store = store;
        this.speed = speed;
        this.client = client;
        this.index = 0;
        this.status = false; // 1play 2pause 3stop
        this.play();

        this.size = this.store.records[this.id].length;
    }

    _createClass(Player, [{
        key: 'setInfo',
        value: function setInfo() {
            var data = {
                size: this.size - 1
            };

            this.client.emit('playerInfo', data);
        }
    }, {
        key: 'setStatus',
        value: function setStatus(status) {
            this.status = status;
            this.client.emit('playerStatus', status);
        }
    }, {
        key: 'setSpeed',
        value: function setSpeed(speed) {
            this.speed = speed;
        }
    }, {
        key: 'setIndex',
        value: function setIndex(index) {
            this.index = index;
        }
    }, {
        key: 'sendFrame',
        value: function sendFrame(index) {
            this.client.emit('data', {data: this.store.records[this.id][index], frame: index});
        }
    }, {
        key: 'play',
        value: function play() {
            if (this.status == 1) return;
            this.setStatus(1);
            this.run();
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (this.status == 2) return;
            this.setStatus(2);
        }
    }, {
        key: 'stop',
        value: function stop() {
            delete this.store.watchers[this.client.id];
            this.setStatus(3);
            delete this.store.players[this.client.id];
        }
    }, {
        key: 'run',
        value: function run() {

            var _this = this;

            _async2.default.forever(function (next) {
                if (!_this.store.watchers.hasOwnProperty(_this.client.id) || _this.store.car) return;

                setTimeout(function () {
                    if (!_this.store.records[_this.id][_this.index]) {
                        _this.stop();
                        return;
                    } else if (_this.status == 2) {
                        return;
                    }

                    _this.sendFrame(_this.index);
                    _this.setIndex(_this.index + 1);
                    next();
                }, _this.speed);
            });
        }
    }]);

    return Player;
}();