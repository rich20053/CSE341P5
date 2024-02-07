const { isNull } = require('util');
const mongodb = require('../models/connect');
const ObjectId = require('mongodb').ObjectId;

// Return all Songs
const getAll = async (req, res, next) => {
  
  const result = await mongodb.getDb().db("Music").collection('Songs').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// Return one Song by id
const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDb()
    .db("Music")
    .collection('Songs')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// Create one Song from body json
const createSong = async (req, res, next) => {

  // Create a Song
  const song = {
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album
  };

  // Save Song in the database
  const result = await mongodb.getDb().db("Music").collection('Songs').insertOne(song);

  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'An error occurred while creating the Song.');
  }
};
  
// Update a single Song
const updateSong = async (req, res, next) => {
  
  const userId = new ObjectId(req.params.id);

  // Update a Song
  const song = {
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album
  };
  
  // Update data in database
  const response = await mongodb.getDb().db("Music").collection('Songs').replaceOne({ _id: userId }, song);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the Song.');
  }
}; 

// Delete one Song
const deleteSong = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  
  const response = await mongodb.getDb().db("Music").collection('Songs').deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the song.');
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createSong, 
  updateSong, 
  deleteSong 
};

