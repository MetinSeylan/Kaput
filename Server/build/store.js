"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var store = function store() {
    _classCallCheck(this, store);

    this.car = false;
    this.records = [];
    this.watchers = [];
    this.players = [];
};

exports.default = store;