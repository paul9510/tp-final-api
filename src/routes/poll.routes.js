const router = require('express').Router();
const pollController = require('../controllers/poll.controller');

router.post('/', pollController.create);
router.get('/', pollController.getAll);
router.get('/:id', pollController.getOne);
router.delete('/:id', pollController.remove);

router.post('/:id/options/:optionId/vote', pollController.vote);

module.exports = router;