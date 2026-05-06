const mongoose = require('mongoose');
const Contact = require('../src/models/Contact');

beforeAll(async () => {
  const url = 'mongodb://127.0.0.1:27017/contact-test';
  await mongoose.connect(url);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Contact Model Validation', () => {
  test('validates contact with all fields (name, email, phone, message)', () => {
    const contact = new Contact({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      message: 'Test message'
    });
    expect(contact.validateSync()).toBeFalsy();
  });

  test('requires name field', () => {
    const contact = new Contact({
      email: 'john@example.com',
      phone: '1234567890',
      message: 'Test message'
    });
    const error = contact.validateSync();
    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
  });

  test('requires email field', () => {
    const contact = new Contact({
      name: 'John Doe',
      phone: '1234567890',
      message: 'Test message'
    });
    const error = contact.validateSync();
    expect(error).toBeDefined();
    expect(error.errors.email).toBeDefined();
  });

  test('allows only name and email (phone and message optional)', () => {
    const contact = new Contact({
      name: 'John Doe',
      email: 'john@example.com'
    });
    expect(contact.validateSync()).toBeFalsy();
  });
});