const { isNull } = require('util');
const mongodb = require('../models/connect');
const ObjectId = require('mongodb').ObjectId;

// Return all Artists
const getAll = async (req, res, next) => {
  
  const result = await mongodb.getDb().db("Music").collection('Artists').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// Return one Artist by id
const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDb()
    .db("Music")
    .collection('Artists')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// Create one Artist from body json
const createArtist = async (req, res, next) => {

  // Create an Artist
  const artist = {
    name: req.body.name,
    type: req.body.type
  };

  // Save Artist in the database
  const result = await mongodb.getDb().db("Music").collection('Artists').insertOne(artist);

  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'An error occurred while creating the Artist.');
  }
};
  
// Update a single Artist
const updateArtist = async (req, res, next) => {
  
  const userId = new ObjectId(req.params.id);

  // Update an Artist
  const artist = {
    name: req.body.name,
    type: req.body.type
  };
  
  // Update data in database
  const response = await mongodb.getDb().db("Music").collection('Artists').replaceOne({ _id: userId }, artist);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the Artist.');
  }
}; 

// Delete one Artist
const deleteArtist = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  
  const response = await mongodb.getDb().db("Music").collection('Artists').deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the artist.');
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createArtist, 
  updateArtist, 
  deleteArtist 
};

