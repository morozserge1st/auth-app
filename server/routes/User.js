const { Router } = require('express');
const controller = require('../controllers/User');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.get('/me', authMiddleware, controller.me);

module.exports = router;
