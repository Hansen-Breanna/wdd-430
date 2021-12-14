const sequenceGenerator = require('./sequenceGenerator');
const Person = require('../models/persons');
const Gift = require('../models/gift');

var express = require('express');
var router = express.Router();
module.exports = router; 

// get
router.get('/', (req, res, next) => {
    Person.find()
      .populate('group')
      .then(persons => {
        res.status(200).json({
            message: "Persons fetched successfully!",
            persons: persons
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
    const maxPersonId = sequenceGenerator.nextId("persons");
  
    const person = new Person({
      id: maxPersonId,
      name: req.body.name,
      budget: req.body.budget,
      image: req.body.image,
      group: req.body.group
    });
    person.save()
      .then(createdPerson => {
        res.status(201).json({
          message: 'Person added successfully',
          person: createdPerson
        });
      })
      .catch(error => {
         res.status(500).json({
            message: error.message,
            error: error
          });
      });
  });
  
// update  
router.put('/:id', (req, res, next) => {
    Person.findOne({ id: req.params.id })
      .then(person => {
        person.name = req.body.name;
        person.budget = req.body.budget;
        person.image = req.body.image;
        person.group = req.body.group;
        
        person.updateOne({ id: req.params.id }, person)
          .then(result => {
            res.status(204).json({              
              message: 'Person updated successfully'
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
          message: 'Person not found.',
          error: { Person: 'Person not found'}
        });
      });
  });
  
router.delete("/:id", (req, res, next) => {
    Person.findOne({ id: req.params.id })
      .then(Person => {
        Person.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Person deleted successfully"
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
          message: 'Person not found.',
          error: { Person: 'Person not found'}
        });
      });
  });
