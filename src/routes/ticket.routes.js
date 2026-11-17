const router = require('express').Router();
const ticketController = require('../controllers/ticket.controller');

router.post('/', ticketController.create);
router.get('/', ticketController.getAll);
router.get('/:id', ticketController.getOne);
router.put('/:id/status', ticketController.updateStatus);
router.delete('/:id', ticketController.remove);

module.exports = router;