import {GPS_STATUS, SET_GPS, SET_GPS_WATCHER, SET_GPS_AVAILABLE} from '../types';


export const initGps = (store) => {

    cordova.plugins.diagnostic.isGpsLocationEnabled((enabled) => {
        if(!enabled) {
            store.dispatch(SET_GPS_AVAILABLE, false);
            alert('Enable GPS!');
            cordova.plugins.diagnostic.switchToLocationSettings();
        }else{
            store.dispatch(SET_GPS_AVAILABLE, true);
        }
    });

}

export const startLocation = (store, timeout) => {

    store.dispatch(GPS_STATUS, true);
    let watcher = navigator.geolocation.watchPosition((response) => {
        store.dispatch(SET_GPS, response);
    }, () => {
        store.dispatch(GPS_STATUS, false);
        store.dispatch(SET_GPS, {
            coords: {
                longitude: false,
                latitude: false,
                accuracy: false
            }
        });
    }, {enableHighAccuracy: true, timeout: timeout});

    store.dispatch(SET_GPS_WATCHER, watcher);

};


export const stopLocation = (store, watcher) => {

    store.dispatch(GPS_STATUS, false);
    store.dispatch(SET_GPS, {
        coords: {
            longitude: false,
            latitude: false,
            accuracy: false
        }
    });
    navigator.geolocation.clearWatch(watcher);

    store.dispatch(SET_GPS_WATCHER, false);

};