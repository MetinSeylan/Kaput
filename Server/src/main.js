import socket from 'socket.io';
import car from './car';
import client from './client';
import config from './config';

var io = socket.listen(config.server_port);

var carSpace = io.of('/car');
var clientSpace = io.of('/client');


car(carSpace, io);
client(clientSpace, io);
