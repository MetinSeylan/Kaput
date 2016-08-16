var mongoose = require('mongoose');
mongoose.connect('mongodb://178.62.195.84/car');

export const model = mongoose.model('timeline', { data: Array, created_at: { type: Date, default: Date.now } });