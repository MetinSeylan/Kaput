import {model} from './database';


var watchers = [];


module.exports = (io, socket) => {

    io.on('connection', (client) => {
        console.log('client conneted');

        model.find().select('_id created_at').limit(10).exec((error, list) => {
            client.emit('list', list);
        });

        client.on('replay', (id) => {

            watchers[client.id] = true;

            function sleep(time) {
                return new Promise((resolve) => setTimeout(resolve, time));
            }


            model.find({_id: id}).exec((error, data) => {

                data[0].data.forEach((frame) => {
                    if (!watchers.hasOwnProperty(client.id)) return false;

                    client.emit('data', frame);

                });

                delete watchers[client.id]

            });

        });

        client.on('disconnect', () => {

            if (watchers.hasOwnProperty(client.id)) delete watchers[client.id];

        });

    });

};