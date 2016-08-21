import { android_token } from './config';
import {model} from './database';
import {fetchUrl} from 'fetch';


var status = false;
var timeline = [];


var engineStatus = (status) => {
    if(!status){
        if(Boolean(timeline.length)) {

            var endLatlng = timeline[timeline.length - 2][0][1] + "," + timeline[timeline.length - 2][0][0];
            var startLatlng = timeline[0][0][1] + "," + timeline[0][0][0];
            var data = timeline;


            new Promise((resolve) => {

                var e = data;

                fetchUrl("http://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng=" + startLatlng, function (error, meta, body) {
                    let response = JSON.parse(body.toString());
                    if (response.results[0].formatted_address) {
                        resolve([response.results[0].formatted_address, e])
                    }
                });

            }).then((res) => {


                fetchUrl("http://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng=" + endLatlng, function (error1, meta1, body1) {
                    let response1 = JSON.parse(body1.toString());

                    if (response1.results[0].formatted_address) {

                        if (res[0] == response1.results[0].formatted_address) return;

                        new model({
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


module.exports = (io, socket, store) => {

    io.on('connection', (client) => {
        console.log('car conneted')

        client.on('auth', (token) => {
            if (token == android_token) store.car = client.id;
            client.emit('auth', true);
            console.log('auth ok')
        });

        client.on('data', (data) => {
            if (store.car != client.id) return;
            if(status){
                timeline.push(data);
                socket.of('client').emit('data', {data: data, frame: 0});
            }
        });

        client.on('status', (stat) => {
            if (store.car != client.id) return;
            socket.of('client').emit('status', stat);
            status = stat;
            engineStatus(stat);
        });


        client.on('disconnect', () => {
            store.car = false;
            socket.of('client').emit('status', false);
            status = false;
            engineStatus(false);
        });


    });

};