const sequenceGenerator = require('./sequenceGenerator');
const Gift = require('../models/gift');

var express = require('express');
var router = express.Router();
module.exports = router; 

// get
router.get('/', (req, res, next) => {
    Gift.find()
      .then(gifts => {
          console.log(gifts);
        res.status(200).json({
            message: "Gifts fetched successfully!",
            gifts: gifts
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
 });

// add
router.post('/', (req, res, next) => {
    const maxGiftId = sequenceGenerator.nextId("gifts");
  
    const gift = new Gift({
      id: maxGiftId,
      recipient: req.body.recipient,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
      image: req.body.image,
      price: req.body.price
    });
  
    gift.save()
      .then(createdGift => {
        res.status(201).json({
          message: 'Gift added successfully',
          gift: createdGift
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

// update  
router.put('/:id', (req, res, next) => {
    Gift.findOne({ id: req.params.id })
      .then(gift => {
        gift.recipient = req.body.recipient;
        gift.name = req.body.name;
        gift.description = req.body.description;
        gift.url =  req.body.url;
        gift.image = req.body.image;
        gift.price = req.body.price;
  
        Gift.updateOne({ id: req.params.id }, gift)
          .then(result => {
            res.status(204).json({
              message: 'gift updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Gift not found.',
          error: { gift: 'Gift not found'}
        });
      });
  });
  
router.delete("/:id", (req, res, next) => {
    Gift.findOne({ id: req.params.id })
      .then(gift => {
        gift.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Gift deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Gift not found.',
          error: { gift: 'Gift not found'}
        });
      });
  });