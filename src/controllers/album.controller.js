const albumService = require('../services/album.service');

exports.create = async (req, res) => {
  const album = await albumService.createAlbum(req.body);
  res.status(201).json(album);
};

exports.getAll = async (req, res) => {
  const albums = await albumService.searchAlbums(req.query);
  res.status(200).json(albums);
};

exports.getOne = async (req, res) => {
  const album = await albumService.getAlbumById(req.params.id);
  if (!album) return res.status(404).json({ error: 'Album introuvable' });
  res.status(200).json(album);
};

exports.update = async (req, res) => {
  const album = await albumService.updateAlbum(req.params.id, req.body);
  if (!album) return res.status(404).json({ error: 'Album introuvable' });
  res.status(200).json(album);
};

exports.remove = async (req, res) => {
  const album = await albumService.deleteAlbum(req.params.id);
  if (!album) return res.status(404).json({ error: 'Album introuvable' });
  res.status(200).json({ message: 'Album supprimé' });
};

exports.addPhoto = async (req, res) => {
  const photos = await albumService.addPhoto(req.params.id, req.body);
  if (!photos) return res.status(404).json({ error: 'Album introuvable' });
  res.status(201).json(photos);
};

exports.addComment = async (req, res) => {
  const comments = await albumService.addCommentToPhoto(req.params.id, req.params.photoId, req.body);
  if (!comments) return res.status(404).json({ error: 'Album introuvable' });
  res.status(201).json(comments);
};