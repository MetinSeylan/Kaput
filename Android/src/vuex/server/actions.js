import {SERVER_STATUS, SERVER_AUTH} from '../types';


export const status = (store, status) => {

    store.dispatch(SERVER_STATUS, status);

};

export const auth = (store, status) => {

    store.dispatch(SERVER_AUTH, status);

};


export const sendData = (store, data, socket) => {



};
