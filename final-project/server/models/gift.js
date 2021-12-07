var mongoose = require('mongoose');

var giftSchema = mongoose.Schema({
    id: { type: String, required: true},
    recipient: { type: String, required: true},
    name: { type: String },
    description: { type: String },
    url: { type: String },
    image: { type: String },
    price: { type: String }
});

module.exports = mongoose.model('Gift', giftSchema);