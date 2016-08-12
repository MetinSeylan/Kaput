import {CAR_LISTEN, CAR_ENGINE_LOAD, CAR_ENGINE_RPM, CAR_ENGINE_STATUS, CAR_SPEED, CAR_COOLANT} from './../types';

const state = {
    status: false,
    listenler: false,
    engineLoad: 0,
    rpm: 0,
    load: 0,
    speed: 0,
    coolant: 0
};

const mutations = {
    [CAR_LISTEN] (state, status) {
        state.listenler = status;
    },
    [CAR_SPEED] (state, speed) {
        state.speed = speed;
    },
    [CAR_COOLANT] (state, coolant) {
        state.coolant = coolant;
    },
    [CAR_ENGINE_LOAD] (state, load) {
        state.load = load;
    },
    [CAR_ENGINE_STATUS] (state, status) {
        state.status = status;
    },
    [CAR_ENGINE_LOAD] (state, load) {
        state.engineLoad = load;
    },
    [CAR_ENGINE_RPM] (state, rpm) {
        state.rpm = rpm;
    }
};

export default {
    state,
    mutations
}