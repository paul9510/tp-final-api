const Album = require('../models/Album');
const Event = require('../models/Event');

const createAlbum = async (data) => {
  const event = await Event.findById(data.event);
  if (!event) throw new Error('Événement introuvable');
  return await Album.create(data);
};

const searchAlbums = async (query) => {
  const filter = {};
  if (query.title) filter.title = { $regex: query.title, $options: 'i' };
  if (query.event) filter.event = query.event;

  return await Album.find(filter).populate('event', 'name');
};

const getAlbumById = async (id) => {
  return await Album.findById(id)
    .populate('photos.uploadedBy photos.comments.author', 'firstName lastName email');
};

const updateAlbum = async (id, data) => {
  return await Album.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteAlbum = async (id) => {
  return await Album.findByIdAndDelete(id);
};

const addPhoto = async (albumId, photoData) => {
  const album = await Album.findById(albumId);
  if (!album) return null;

  const event = await Event.findById(album.event);
  const isParticipant = event.participants.some(id => id.toString() === photoData.uploadedBy) ||
                        event.organizers.some(id => id.toString() === photoData.uploadedBy);
  if (!isParticipant) {
    const err = new Error('Seul un participant de l’événement peut poster une photo.');
    err.status = 403;
    throw err;
  }

  album.photos.push(photoData);
  await album.save();
  return album.photos;
};

const addCommentToPhoto = async (albumId, photoId, commentData) => {
  const album = await Album.findById(albumId);
  if (!album) return null;

  const event = await Event.findById(album.event);
  const isParticipant = event.participants.some(id => id.toString() === commentData.author) ||
                        event.organizers.some(id => id.toString() === commentData.author);
  if (!isParticipant) {
    const err = new Error('Seul un participant de l’événement peut commenter.');
    err.status = 403;
    throw err;
  }

  const photo = album.photos.id(photoId);
  if (!photo) {
    const err = new Error('Photo introuvable');
    err.status = 404;
    throw err;
  }

  photo.comments.push(commentData);
  await album.save();
  return photo.comments;
};

module.exports = {
  createAlbum,
  searchAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  addPhoto,
  addCommentToPhoto
};