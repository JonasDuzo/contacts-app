// src/routes/contacts.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getContacts);
router.post('/', contactController.createContact);
router.post('/:id/delete', contactController.deleteContact);

module.exports = router;