// src/app.js
const express = require('express');
const expressHandlebars = require('express-handlebars');
// const helpers = require('./config/handlebars-helpers');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Logging
app.use(morgan('combined'));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Handlebars setup
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
//   helpers: helpers
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/contacts-app')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Erro MongoDB:', err));

// Rotas
const contactRoutes = require('./routes/contacts');
app.use('/', contactRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Erro
app.use((err, req, res) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;