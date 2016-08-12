import {BLUETOOTH_STATUS, SET_BLUETOOTH_PAIRED, SET_BLUETOOTH_UNPAIRED, BLUETOOTH_SCANING,  BLUETOOTH_CONNECTING, BLUETOOTH_CONNECTED} from './../types';

const state = {
    paired: false,
    unpaired: false,
    scaning: false,
    connecting: false,
    connected: false,
    status: false,
    error: null
};

const mutations = {
    [BLUETOOTH_STATUS] (state, status) {
        state.status = status;
    },
    [SET_BLUETOOTH_PAIRED] (state, list) {
        state.paired = list;
    },
    [SET_BLUETOOTH_UNPAIRED] (state, list) {
        state.unpaired = list;
    },
    [BLUETOOTH_SCANING] (state, status) {
        state.scaning = status;
    },
    [BLUETOOTH_CONNECTING] (state, status) {
        state.connecting = status;
    },
    [BLUETOOTH_CONNECTED] (state, status) {
        state.connected = status;
    }

};

export default {
    state,
    mutations
}