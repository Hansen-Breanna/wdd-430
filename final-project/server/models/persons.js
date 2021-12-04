var mongoose = require('mongoose');

var personSchema = mongoose.Schema({
    id: { type: String, required: true},
    name: { type: String },
    budget: { type: String },
    image: { type: String },
    group:  [{ type: mongoose.Schema.Types.String, ref: 'Gift' }]
});

module.exports = mongoose.model('People', personSchema);