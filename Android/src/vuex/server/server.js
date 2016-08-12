import {SERVER_STATUS, SERVER_AUTH} from './../types';

const state = {
    status: false,
    auth: false
};

const mutations = {
    [SERVER_STATUS] (state, status) {
        state.status = status;
    },
    [SERVER_AUTH] (state, status) {
        state.auth = status;
    }
};

export default {
    state,
    mutations
}