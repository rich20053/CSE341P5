const { isNull } = require('util');
const mongodb = require('../models/connect');
const ObjectId = require('mongodb').ObjectId;

// Return all Albums
const getAll = async (req, res, next) => {
  
  const result = await mongodb.getDb().db("Music").collection('Albums').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// Return one Album by id
const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDb()
    .db("Music")
    .collection('Albums')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// Create one Album from body json
const createAlbum = async (req, res, next) => {

  // Create an Album
  const album = {
    title: req.body.title,
    artist: req.body.artist,
    media: req.body.media,
    genre: req.body.genre,
    year: req.body.year
  };

  // Save Album in the database
  const result = await mongodb.getDb().db("Music").collection('Albums').insertOne(album);

  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'An error occurred while creating the album.');
  }
};
  
// Update a single Album
const updateAlbum = async (req, res, next) => {
  
  const userId = new ObjectId(req.params.id);

  // Update an Album
  const album = {
    title: req.body.title,
    artist: req.body.artist,
    media: req.body.media,
    genre: req.body.genre,
    year: req.body.year
  };
  
  // Update data in database
  const response = await mongodb.getDb().db("Music").collection('Albums').replaceOne({ _id: userId }, album);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the album.');
  }
}; 

// Delete one Album
const deleteAlbum = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  
  const response = await mongodb.getDb().db("Music").collection('Albums').deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the album.');
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createAlbum, 
  updateAlbum, 
  deleteAlbum 
};

