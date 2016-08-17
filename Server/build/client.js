'use strict';

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _database = require('./database');

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

var watchers = [];

module.exports = function (io, socket, store) {

    io.on('connection', function (client) {
        console.log('client conneted');

        _database.model.find().select('_id start end created_at').limit(10).exec(function (error, list) {
            client.emit('list', list);
        });

        client.on('player_speed', function (speed) {
            if (!store.watchers.hasOwnProperty(client.id) || store.car) return;

            if (speed == 1) {
                store.players[client.id].setSpeed(240);
            } else if (speed == 2) {
                store.players[client.id].setSpeed(125);
            } else if (speed == 3) {
                store.players[client.id].setSpeed(84);
            } else if (speed == 4) {
                store.players[client.id].setSpeed(63);
            }
        });

        client.on('change_frame', function (index) {
            store.players[client.id].setIndex(index);
            store.players[client.id].sendFrame(index);
        });

        client.on('player_play', function () {
            store.players[client.id].play();
        });

        client.on('player_pause', function () {
            store.players[client.id].pause();
        });

        client.on('player_stop', function () {
            store.players[client.id].stop();
        });

        client.on('replay', function (id) {

            if (store.watchers.hasOwnProperty(client.id) || store.car) return;

            new Promise(function (resolve) {

                if (!store.records.hasOwnProperty(id)) {

                    _database.model.find({_id: id}).exec(function (error, response) {
                        store.records[id] = response[0].data;
                        resolve();
                    });
                } else {
                    resolve();
                }
            }).then(function () {

                store.watchers[client.id] = true;
                store.players[client.id] = new _player2.default(id, store, 240, client);

                store.players[client.id].setInfo();
            });
        });

        client.on('disconnect', function () {

            if (store.watchers.hasOwnProperty(client.id)) {
                delete store.watchers[client.id];
                delete store.players[client.id];
            }
        });
    });
};