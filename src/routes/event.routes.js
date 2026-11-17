const router = require('express').Router();
const eventController = require('../controllers/event.controller');

router.post('/', eventController.create);
router.get('/', eventController.getAll);
router.get('/:id', eventController.getOne);
router.put('/:id', eventController.update);
router.delete('/:id', eventController.remove);

router.post('/:id/participants', eventController.addParticipant);
router.post('/:id/organizers', eventController.addOrganizer);

router.post('/:id/shopping-list', eventController.addShoppingItem);
router.delete('/:id/shopping-list/:itemId', eventController.removeShoppingItem);

router.post('/:id/carpools', eventController.addCarpool);
router.delete('/:id/carpools/:carpoolId', eventController.removeCarpool);

module.exports = router;