import {SET_GPS, GPS_STATUS, SET_GPS_WATCHER, SET_GPS_AVAILABLE} from './../types';

const state = {
    location: {
        coords: {
            longitude: false,
            latitude: false,
            accuracy: false
        }
    },
    status: false,
    watcher: false,
    available: false
};

const mutations = {
    [SET_GPS] (state, response) {
        state.location = response;
    },
    [GPS_STATUS] (state, status) {
        state.status = status;
    },
    [SET_GPS_WATCHER] (state, watcher) {
        state.watcher = watcher;
    },
    [SET_GPS_AVAILABLE] (state, status) {
        state.available = status;
    }
};

export default {
    state,
    mutations
}