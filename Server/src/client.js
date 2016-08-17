import async from 'async';
import {model} from './database';
import Player from './player';

var watchers = [];


module.exports = (io, socket, store) => {

    io.on('connection', (client) => {
        console.log('client conneted');


        model.find().select('_id start end created_at').limit(10).exec((error, list) => {
            client.emit('list', list);
        });

        client.on('player_speed', (speed) => {
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


        client.on('change_frame', (index) => {
            store.players[client.id].setIndex(index);
            store.players[client.id].sendFrame(index);
        });

        client.on('player_play', () => {
            store.players[client.id].play();
        });

        client.on('player_pause', () => {
            store.players[client.id].pause();
        });

        client.on('player_stop', () => {
            store.players[client.id].stop();
        });

        client.on('replay', (id) => {

            if (store.watchers.hasOwnProperty(client.id) || store.car) return;

            new Promise((resolve) => {

                if (!store.records.hasOwnProperty(id)) {

                    model.find({_id: id}).exec((error, response) => {
                        store.records[id] = response[0].data;
                        resolve();
                    });

                } else {
                    resolve();
                }

            }).then(() => {

                store.watchers[client.id] = true;
                store.players[client.id] = new Player(id, store, 240, client);

                store.players[client.id].setInfo();

            });


        });

        client.on('disconnect', () => {

            if (store.watchers.hasOwnProperty(client.id)) {
                delete store.watchers[client.id];
                delete store.players[client.id];
            }

        });

    });

};