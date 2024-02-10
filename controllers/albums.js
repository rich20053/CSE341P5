const { isNull } = require('util');
const mongodb = require('../models/connect');
const ObjectId = require('mongodb').ObjectId;

// Return all albums
const getAll = async (req, res, next) => {
  
  const result = await mongodb.getDb().db("music").collection('albums').find();
  //console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// Return one album by id
const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);

  const result = await mongodb.getDb().db("music").collection('albums').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// Create one album from body json
const createAlbum = async (req, res, next) => {

  var artistId = new ObjectId;

  /*
  // Find the artist
  if (typeof req.body.artist != "undefined") {
    console.log("artist block");
    const artist = req.body.artist;
    console.log(artist);
    var myCursor = await mongodb.getDb().db("music").collection('artists').find({ name: artist });
    console.log("cursor");
    console.log(myCursor);
    console.log('myCursor.toArray()');
    console.log(myCursor.toArray());
    console.log('myCursor.hasNext()');
    console.log(myCursor.hasNext());
    console.log('myCursor.next()');
    console.log(myCursor.next());
    var myDocumentList = myCursor.toArray();
    console.log(myDocumentList.length);
    var myDocument = myDocumentList[0];
    console.log("myDocument");
    console.log(myDocument);
    if (typeof myDocument != "undefined") {
      console.log("myDocument not undefined");
      console.log(myDocument);
      console.log("artist_id");
      console.log(myDocument);
      artistId = new ObjectId(myDocument.artist_id);
      console.log("reset artistId");
      console.log(artistId);
    }
    console.log("0");
    console.log(artistId);  
  }
  else {
    */
    artistId = new ObjectId(req.body.artist_id);
  //}

  //console.log("1");
  // Create an album
  const album = {
    title: req.body.title,
    artist_id: artistId,
    media: req.body.media,
    genre: req.body.genre,
    year: req.body.year,
    tracks: req.body.tracks,
    mins: req.body.mins,
    discnbr: req.body.discnbr
  };
  //console.log("2");
  //console.log(album);

  // Save Album in the database
  const result = await mongodb.getDb().db("music").collection('albums').insertOne(album);
  //console.log("3");

  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'An error occurred while creating the album.');
  }
};
  
// Update a single album
const updateAlbumById = async (req, res, next) => {
  
  const userId = new ObjectId(req.params.id);

  // Update an album
  const album = {
    title: req.body.title,
    artist_id: new ObjectId(req.body.artist_id),
    media: req.body.media,
    genre: req.body.genre,
    year: req.body.year,
    tracks: req.body.tracks,
    mins: req.body.mins,
    discnbr: req.body.discnbr
  };
  
  // Update data in database
  const response = await mongodb.getDb().db("music").collection('albums').replaceOne({ _id: userId }, album);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the album.');
  }
}; 

// Delete one albums
const deleteAlbum = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  
  const response = await mongodb.getDb().db("music").collection('albums').deleteOne({ _id: userId }, true);
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
  updateAlbumById, 
  deleteAlbum 
};

