import {CAR_ENGINE_LOAD, CAR_ENGINE_RPM, CAR_ENGINE_STATUS, CAR_SPEED, CAR_COOLANT} from './../types';

var rawLines = (raw) => {

    let split = raw.split(/\r\n|\r|\n/g);

    if(split.length == 1) return false;

    try{
        return {
            key: split[0].trim(),
            value: split[1].trim()
        }
    }
    catch(e){
        return false;
    }

};

export const parse = (raw, store) => {
    let lines = rawLines(raw);

    if(!lines) return;

    if(lines.value == 'STOPPED' || lines.value == 'NO DATA' || lines.value == 'SEARCHING...') lines.value = false;

    pids.forEach((pid) => {
        if(pid.pid == lines.key) pid.parse(lines, store);
    });

    return true;
}



export const pids = [
    {
        // Motor Devri
        pid: '010C',
        name: 'rpm',
        parse: (raw, store) => {

            if(!raw.value) {
                store.dispatch(CAR_ENGINE_RPM, 0);
                store.dispatch(CAR_ENGINE_STATUS, false);
                return;
            }

            let a = raw.value.split(' ');

            let rpm =  ((parseInt(a[2], 16) * 256) + parseInt(a[3], 16)) / 4;

            if(rpm == 0){
                store.dispatch(CAR_ENGINE_STATUS, false);
            }else{
                store.dispatch(CAR_ENGINE_STATUS, true);
            }

            store.dispatch(CAR_ENGINE_RPM, rpm);
        }
    },
    {
        // Araç Hızı
        pid: '010D',
        name: 'speed',
        parse: (raw, store) => {

            if(!raw.value) {
                store.dispatch(CAR_SPEED, 0);
                return;
            }

            store.dispatch(CAR_SPEED, Math.round(parseInt(raw.value.split(' ')[2], 16)));

        }
    },
    {
        // Motor Yükü Yüzde ile
        pid: '0104',
        name: 'engineLoad',
        parse: (raw ,store) => {

            if(!raw.value) {
                store.dispatch(CAR_ENGINE_LOAD, 0);
                return;
            }

            let load = Math.round(parseInt(raw.value.split(' ')[2], 16) * (100 / 255));

            if(load == 0) store.dispatch(CAR_ENGINE_LOAD, 0);

            store.dispatch(CAR_ENGINE_LOAD, load);

        }
    },
    {
        // Radyatör Sıcaklığı
        pid: '0105',
        name: 'coolant',
        parse: (raw, store) => {
            if(!raw.value) {
                store.dispatch(CAR_COOLANT, 0);
                return;
            }

            store.dispatch(CAR_COOLANT, Math.round(parseInt(raw.value.split(' ')[2], 16)));
        }
    }
]
