'use strict';

var _config = require('./config');

var _database = require('./database');

var status = false;
var timeline = [];

var engineStatus = function engineStatus(status) {
    if (!status) {
        if (Boolean(timeline.length)) {
            new _database.model({data: timeline}).save();
        }

        timeline = [];
    }
};

module.exports = function (io, socket, store) {

    io.on('connection', function (client) {
        console.log('car conneted');

        client.on('auth', function (token) {
            if (token == _config.android_token) store.car = client.id;
            client.emit('auth', true);
            console.log('auth ok');
        });

        client.on('data', function (data) {
            if (store.car != client.id) return;
            if (status) {
                timeline.push(data);
                socket.of('client').emit('data', data);
            }
        });

        client.on('status', function (stat) {
            if (store.car != client.id) return;
            socket.of('client').emit('status', stat);
            status = stat;
            engineStatus(stat);
        });

        client.on('disconnect', function () {
            store.car = false;
            socket.of('client').emit('status', false);
            status = false;
            engineStatus(false);
        });
    });
};