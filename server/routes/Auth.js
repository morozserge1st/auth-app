const { Router } = require('express');
const controller = require('../controllers/Auth');

const router = Router();

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

module.exports = router;
