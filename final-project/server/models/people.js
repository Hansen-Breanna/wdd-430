var mongoose = require('mongoose');

var peopleSchema = mongoose.Schema({
    id: { type: String, required: true},
    name: { type: String },
    budget: { type: String },
    image: { type: String },
    group:  [{ type: mongoose.Schema.Types.String, ref: 'People' }]
});

module.exports = mongoose.model('People', peopleSchema);