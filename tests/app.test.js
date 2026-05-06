// tests/app.test.js
const request = require('supertest');
const app = require('../src/app');

// Não precisa de conexão real com MongoDB para testes básicos
describe('Contacts App - Integration Tests', () => {

  it('deve retornar status 200 em /health', async () => {
    const response = await request(app)
      .get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
  });

  it('deve retornar erro 404 para rota inexistente', async () => {
    const response = await request(app)
      .get('/rota-inexistente');

    expect(response.status).toBe(404);
  });

  it('deve renderizar página inicial', async () => {
    const response = await request(app)
      .get('/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Sistema de Contatos');
  });
});