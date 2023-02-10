const express = require('express');
const controller = require('../contollers/admin');
const router = express.Router();

router.get('/', controller.getUsers);

module.exports = router;