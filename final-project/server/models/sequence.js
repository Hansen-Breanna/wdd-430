var mongoose = require('mongoose');

var sequenceSchema = mongoose.Schema({
    maxPersonId: { type: String, required: true},
    maxGiftId: { type: String, required: true},
});

module.exports = mongoose.model('Sequence', sequenceSchema);