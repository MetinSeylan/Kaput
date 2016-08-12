var mongoose = require('mongoose');
mongoose.connect('mongodb://metinseylan.com/car');

export const model = mongoose.model('timeline', { data: Array, created_at: { type: Date, default: Date.now } });