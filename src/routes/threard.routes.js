const router = require('express').Router();
const threadController = require('../controllers/thread.controller');

router.post('/', threadController.create);
router.get('/', threadController.getAll);
router.get('/:id', threadController.getOne);
router.put('/:id', threadController.update);
router.delete('/:id', threadController.remove);

router.post('/:id/messages', threadController.addMessage);
router.post('/:id/messages/:messageId/comments', threadController.addComment);

module.exports = router;