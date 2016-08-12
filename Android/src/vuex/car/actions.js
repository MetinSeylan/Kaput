import {CAR_LISTEN} from '../types';

import {pids, parse} from './pids';

export const requestServiceRun = (store) =>{

    let lastIndex = 0;
    let total = pids.length-1;

    bluetoothSerial.subscribe('>', (response) => {
        parse(response, store);

        bluetoothSerial.write(pids[lastIndex].pid+'\r');

        if(lastIndex == total){
            lastIndex = 0;
        }else{
            lastIndex = lastIndex+1;
        }

    });

    setTimeout(() => {
        // Reset the router
        bluetoothSerial.write('ATZ\r');
        //Turns off extra line feed and carriage return
        bluetoothSerial.write('ATL0\r');
        //Disable spaces in the output
        bluetoothSerial.write('ATS0\r');
        //Turn off headers and checksum to be sent.
        bluetoothSerial.write('ATH0\r');
        //Turn off echo.
        bluetoothSerial.write('ATE0\r');
        //Turn adaptive timing to 2.
        bluetoothSerial.write('ATAT2\r');
        //Set the protocol to automatic.
        bluetoothSerial.write('ATSP0\r');
    }, 1000);

    store.dispatch(CAR_LISTEN, true);

};
