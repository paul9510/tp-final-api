const router = require('express').Router();
const albumController = require('../controllers/album.controller');

router.post('/', albumController.create);
router.get('/', albumController.getAll);
router.get('/:id', albumController.getOne);
router.put('/:id', albumController.update);
router.delete('/:id', albumController.remove);

router.post('/:id/photos', albumController.addPhoto);
router.post('/:id/photos/:photoId/comments', albumController.addComment);

module.exports = router;