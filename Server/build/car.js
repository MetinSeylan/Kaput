'use strict';

var _config = require('./config');

var _database = require('./database');

var _fetch = require('fetch');

var status = false;
var timeline = [];

var engineStatus = function engineStatus(status) {
    if (!status) {
        if (Boolean(timeline.length)) {

            var endLatlng = timeline[timeline.length - 2][0][1] + "," + timeline[timeline.length - 2][0][0];
            var startLatlng = timeline[0][0][1] + "," + timeline[0][0][0];
            var data = timeline;

            new Promise(function (resolve) {

                var e = data;

                (0, _fetch.fetchUrl)("http://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng=" + startLatlng, function (error, meta, body) {
                    var response = JSON.parse(body.toString());
                    if (response.results[0].formatted_address) {
                        resolve([response.results[0].formatted_address, e]);
                    }
                });
            }).then(function (res) {

                (0, _fetch.fetchUrl)("http://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng=" + endLatlng, function (error1, meta1, body1) {
                    var response1 = JSON.parse(body1.toString());

                    if (response1.results[0].formatted_address) {

                        new _database.model({
                            data: res[1],
                            start: res[0],
                            end: response1.results[0].formatted_address
                        }).save();
                    }
                });
            });
        }

        data = [];

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
                socket.of('client').emit('data', {data: data, frame: 0});
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