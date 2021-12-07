var Sequence = require('../models/sequence');

var maxPeopleId;
var maxGiftId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      console.log(sequence);
      if(sequence==null){
        console.log("the sequence is null");
      } else {
        console.log("it worked");
      }
      sequenceId = sequence._id;
      maxPeopleId = sequence.maxPeopleId;
      maxGiftId = sequence.maxGiftId;
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'persons':
      maxPeopleId++;
      updateObject = {maxPeopleId: maxPeopleId};
      nextId = maxPeopleId;
      break;
    case 'gifts':
      maxGiftId++;
      updateObject = {maxGiftId: maxGiftId};
      nextId = maxGiftId;
      break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
