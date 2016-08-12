import {SET_COMPASS, COMPASS_STATUS} from './../types';

const state = {
    compass: {magneticHeading: 0, trueHeading: 0, headingAccuracy: 0, timestamp: 0},
    status: false
};

const mutations = {
    [SET_COMPASS] (state, response) {
        state.compass = response;
    },
    [COMPASS_STATUS] (state, status) {
        state.status = status;
    }
};

export default {
    state,
    mutations
}