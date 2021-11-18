var mongoose = require('mongoose');

var sequenceSchema = mongoose.Schema({
    maxDocumentId: { type: number, required: true},
    maxMessageId: { type: number, required: true},
    maxContactId: { type: number, required: true},
});

module.exports = mongoose.model('Sequence', sequenceSchema);