import Vue from 'vue';
import Vuex from 'vuex';
import socket from 'socket.io-client';

import bluetooth from './bluetooth/bluetooth';
import compass from './compass/compass';
import gps from './gps/gps';
import server from './server/server';
import car from './car/car';

Vue.use(Vuex);

const state = {
};


const mutations = {

};


export default new Vuex.Store({
    modules: {
        compass,
        bluetooth,
        gps,
        server,
        car
    },
    state,
    mutations
})