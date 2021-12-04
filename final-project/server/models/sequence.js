var mongoose = require('mongoose');

var sequenceSchema = mongoose.Schema({
    maxPeopleId: { type: String, required: true},
    maxGiftId: { type: String, required: true},
});

module.exports = mongoose.model('Sequences', sequenceSchema);