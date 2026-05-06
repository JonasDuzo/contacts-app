// src/controllers/contactController.js
const Contact = require('../models/Contact');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.render('index', { contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).render('error', { message: 'Server error' });
  }
};

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email) {
      return res.status(400).render('index', {
        error: 'Nome e email são obrigatórios',
        contacts: await Contact.find()
      });
    }

    await Contact.create({ name, email, phone, message });
    console.log('Contact created:', email);

    res.redirect('/');
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).render('error', { message: 'Server error' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    console.log('Contact deleted:', id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).render('error', { message: 'Server error' });
  }
};