const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.create);
router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;