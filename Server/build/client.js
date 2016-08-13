'use strict';

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _database = require('./database');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

var watchers = [];

module.exports = function (io, socket, store) {

    io.on('connection', function (client) {
        console.log('client conneted');

        _database.model.find().select('_id created_at').limit(10).exec(function (error, list) {
            client.emit('list', list);
        });

        client.on('replay_speed', function (speed) {
            if (!watchers.hasOwnProperty(client.id) || store.car) return;

            if (speed == 1) {
                watchers[client.id] = 250;
            } else if (speed == 2) {
                watchers[client.id] = 125;
            } else if (speed == 3) {
                watchers[client.id] = 84;
            } else if (speed == 4) {
                watchers[client.id] = 63;
            }
        });

        client.on('replay', function (id) {

            if (watchers.hasOwnProperty(client.id) || store.car) return;

            watchers[client.id] = 250;
            client.emit('play', true);

            _database.model.find({_id: id}).exec(function (error, response) {

                _async2.default.eachSeries(response[0].data, function iteratee(item, callback) {

                    if (!watchers.hasOwnProperty(client.id) || store.car) return;

                    setTimeout(function () {
                        client.emit('data', item);
                        callback();
                    }, watchers[client.id]);
                }, function done() {
                    delete watchers[client.id];
                    client.emit('play', false);
                });
            });
        });

        client.on('disconnect', function () {

            if (watchers.hasOwnProperty(client.id)) delete watchers[client.id];
        });
    });
};