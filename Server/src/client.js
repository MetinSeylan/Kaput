import async from 'async';
import {model} from './database';

var watchers = [];


module.exports = (io, socket, store) => {

    io.on('connection', (client) => {
        console.log('client conneted');

        model.find().select('_id created_at').limit(10).exec((error, list) => {
            client.emit('list', list);
        });

        client.on('replay_speed', (speed) => {
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

        client.on('replay', (id) => {

            if (watchers.hasOwnProperty(client.id) || store.car) return;

            watchers[client.id] = 250;
            client.emit('play', true);

            model.find({_id: id}).exec((error, response) => {

                async.eachSeries(response[0].data, function iteratee(item, callback) {

                    if (!watchers.hasOwnProperty(client.id) || store.car) return;

                    setTimeout(() => {
                        client.emit('data', item);
                        callback();
                    }, watchers[client.id]);

                }, function done() {
                    delete watchers[client.id];
                    client.emit('play', false);
                });

            });

        });

        client.on('disconnect', () => {

            if (watchers.hasOwnProperty(client.id)) delete watchers[client.id];

        });

    });

};