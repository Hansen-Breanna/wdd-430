const sequenceGenerator = require('./sequenceGenerator');
const Person = require('../models/persons');
const Gift = require('../models/gift');

var express = require('express');
var router = express.Router();
module.exports = router; 

// get
router.get('/', (req, res, next) => {
    Person.find()
      .then(persons => {
        console.log(persons + "step into person route");
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
    const maxDocumentId = sequenceGenerator.nextId("persons");
  
    const person = new Document({
      id: maxDocumentId,
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
            message: 'An error occurred',
            error: error
          });
      });
  });

// update  
router.put('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id })
      .then(document => {
        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;
  
        Document.updateOne({ id: req.params.id }, document)
          .then(result => {
            res.status(204).json({
              message: 'Document updated successfully'
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
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });
  
router.delete("/:id", (req, res, next) => {
    Document.findOne({ id: req.params.id })
      .then(document => {
        Document.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Document deleted successfully"
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
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });