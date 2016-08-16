import async from 'async';

module.exports = class Player {
    constructor(id, store, speed, client) {
        this.id = id;
        this.store = store;
        this.speed = speed;
        this.client = client;
        this.index = 0;
        this.status = false; // 1play 2pause 3stop
        this.play();

        this.size = this.store.records[this.id].length;
    }

    setInfo() {
        let data = {
            size: this.size - 1
        }

        this.client.emit('playerInfo', data);
    }


    setStatus(status) {
        this.status = status;
        this.client.emit('playerStatus', status);
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    setIndex(index) {
        this.index = index;
    }

    play() {
        if (this.status == 1) return;
        this.setStatus(1);
        this.run();
    }

    pause() {
        if (this.status == 2) return;
        this.setStatus(2);
    }

    stop() {
        delete this.store.watchers[this.client.id];
        this.setStatus(3);
        delete this.store.players[this.client.id];
    }


    run() {

        let _this = this;

        async.forever(
            function (next) {
                if (!_this.store.watchers.hasOwnProperty(_this.client.id) || _this.store.car) return;

                setTimeout(() => {
                    if (!_this.store.records[_this.id][_this.index]) {
                        _this.stop();
                        return;
                    }
                    else if (_this.status == 2) {
                        return;
                    }

                    _this.client.emit('data', {data: _this.store.records[_this.id][_this.index], frame: _this.index});
                    _this.setIndex(_this.index + 1);
                    next();
                }, _this.speed);

            }
        );

    }
}

