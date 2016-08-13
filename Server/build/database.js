'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');
mongoose.connect('mongodb://metinseylan.com/car');

var model = exports.model = mongoose.model('timeline', {data: Array, created_at: {type: Date, default: Date.now}});