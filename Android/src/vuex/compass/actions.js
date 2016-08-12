import {COMPASS_STATUS, SET_COMPASS} from '../types';


export const startHeading = (store) => {

    store.dispatch(COMPASS_STATUS, true);
    navigator.compass.watchHeading((response) => {
        store.dispatch(SET_COMPASS, response);
    }, () => {
        store.dispatch(COMPASS_STATUS, false);
        store.dispatch(SET_COMPASS, {magneticHeading: 0, trueHeading: 0, headingAccuracy: 0, timestamp: 0});
    });

};
