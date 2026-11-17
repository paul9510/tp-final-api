const router = require('express').Router();
const groupController = require('../controllers/group.controller');

router.post('/', groupController.create);
router.get('/', groupController.getAll);
router.get('/:id', groupController.getOne);
router.put('/:id', groupController.update);
router.delete('/:id', groupController.remove);

router.post('/:id/members', groupController.addMember);
router.delete('/:id/members/:userId', groupController.removeMember);
router.post('/:id/admins', groupController.addAdmin);
router.post('/:id/events', groupController.createEvent);

module.exports = router;