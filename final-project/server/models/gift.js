var mongoose = require('mongoose');

var giftSchema = mongoose.Schema({
    id: { type: String, required: true},
    name: { type: String },
    description: { type: String },
    url: { type: String },
    image: { type: String },
    price: { type: String },
    children:  [{ type: mongoose.Schema.Types.String, ref: 'Gift' }]
});

module.exports = mongoose.model('Gift', giftSchema);