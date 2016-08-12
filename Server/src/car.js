import { android_token } from './config';
import {model} from './database';

var car = false;
var status = false;
var timeline = [];


var engineStatus = (status) => {
    if(!status){
        if(Boolean(timeline.length)) {
            new model({data: timeline}).save();
        }

        timeline = [];
    }
};


module.exports = (io, socket) => {

    io.on('connection', (client) => {
        console.log('car conneted')


        client.on('auth', (token) => {
            if(token == android_token) car = client.id;
            client.emit('auth', true);
            console.log('auth ok')
        });

        client.on('data', (data) => {
            if(car != client.id) return;
            if(status){
                timeline.push(data);
                socket.of('client').emit('data', data);
            }
        });

        client.on('status', (stat) => {
            if(car != client.id) return;
            socket.of('client').emit('status', stat);
            status = stat;
            engineStatus(stat);
        });


        client.on('disconnect', () => {
            car = false;
            socket.of('client').emit('status', false);
            status = false;
            engineStatus(false);
        });


    });

};