import socket from 'socket.io';
import storeClass from './store';
import car from './car';
import client from './client';
import config from './config';


var io = socket.listen(config.server_port);

var store = new storeClass();

var carSpace = io.of('/car');
var clientSpace = io.of('/client');


car(carSpace, io, store);
client(clientSpace, io, store);
