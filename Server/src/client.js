import {model} from './database';

module.exports = (io, socket) => {

    io.on('connection', (client) => {
        console.log('client conneted');

        model.find().select('_id created_at').limit(10).exec((error, list) => {
            client.emit('list', list);
        });

    });

};