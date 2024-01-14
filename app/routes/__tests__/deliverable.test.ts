import request from 'supertest';
import express, { Router } from 'express';

const app = express();
app.use(express.json());

// Mocking the Authentication middleware
jest.mock('../../middleware/Authentication', () => ({
  authenticate: jest.fn((req, res, next) => next()),
}));

// Assuming your router is exported as default
import router from '../deliverable';
import { Authentication } from '../../middleware';

app.use('/api/deliverables', router);

describe('Deliverable Routes', () => {
  it('should call Authentication middleware before getting paginated list', async () => {
    await request(app).get('/api/deliverables');
    expect(Authentication.authenticate).toHaveBeenCalled();
  });

  it('should call Authentication middleware before getting deliverable by ID', async () => {
    await request(app).get('/api/deliverables/1');
    expect(Authentication.authenticate).toHaveBeenCalled();
  });

  it('should return paginated list of deliverables', async () => {
    const response = await request(app).get('/api/deliverables');
    expect(response.status).toBe(200);
  });

  it('should return a specific deliverable by ID', async () => {
    const response = await request(app).get('/api/deliverables/1');
    expect(response.status).toBe(200);
    const deliverable = response.body.data;

    expect(deliverable.id).toBe(1)
    expect(deliverable.Name).toBe('Deliverables Sample')
  });
});
