import {SET_BLUETOOTH_PAIRED, SET_BLUETOOTH_UNPAIRED, BLUETOOTH_SCANING, BLUETOOTH_STATUS, BLUETOOTH_CONNECTING, BLUETOOTH_CONNECTED} from '../types';


export const initBluetooth = (store) => {

   return new Promise((resolve, reject) => {
        bluetoothSerial.isEnabled(resolve, reject);
    }).then(() => {
        store.dispatch(BLUETOOTH_STATUS, true);
    }, () => {
        store.dispatch(BLUETOOTH_STATUS, false);

        bluetoothSerial.enable(() => {
            store.dispatch(BLUETOOTH_STATUS, true);
        });
    });

};


export const connectDevice = (store, mac) => {

    return new Promise((resolve, reject) => {
        store.dispatch(BLUETOOTH_CONNECTING, true);
        bluetoothSerial.connect(mac, resolve, reject);
    }).then(() => {
        store.dispatch(BLUETOOTH_CONNECTING, false);

        store.dispatch(BLUETOOTH_CONNECTED, mac);
        localStorage.setItem('device', mac);
        return Promise.resolve();
    }, (response) => {
        alert(response);
        store.dispatch(BLUETOOTH_CONNECTED, false);
        store.dispatch(BLUETOOTH_CONNECTING, false);
        localStorage.removeItem('device');
        return Promise.reject();
    });

};

export const getPaired = (store) => {

    bluetoothSerial.list((list) => {
        store.dispatch(SET_BLUETOOTH_PAIRED, list);
    });

};

export const scanUnpaired = (store) => {

    store.dispatch(BLUETOOTH_SCANING, true);
    bluetoothSerial.discoverUnpaired(function(devices) {
        store.dispatch(SET_BLUETOOTH_UNPAIRED, devices);
        store.dispatch(BLUETOOTH_SCANING, false);
    }, () => {
        store.dispatch(BLUETOOTH_SCANING, false);
    });

};


