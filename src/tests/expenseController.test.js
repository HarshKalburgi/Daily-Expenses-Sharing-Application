const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const Expense = require('../models/Expense');
const jwt = require('jsonwebtoken');

let token;
let userId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const user = await User.create({ email: 'test@example.com', name: 'Test User', mobileNumber: '1234567890', password: 'password123' });
  userId = user._id;
  token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await User.deleteMany({});
  await Expense.deleteMany({});
  await mongoose.connection.close();
});

describe('Expense Controller', () => {
  describe('POST /api/expenses', () => {
    it('should create a new expense with equal split', async () => {
      const response = await request(app)
        .post('/api/expenses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          amount: 100,
          description: 'Test Expense',
          splitMethod: 'equal',
          participants: [{ user: userId }],
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.amount).toBe(100);
      expect(response.body.splitMethod).toBe('equal');
    });

    it('should create a new expense with exact split', async () => {
      const response = await request(app)
        .post('/api/expenses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          amount: 100,
          description: 'Test Expense',
          splitMethod: 'exact',
          participants: [{ user: userId, amount: 100 }],
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.amount).toBe(100);
      expect(response.body.splitMethod).toBe('exact');
    });

    it('should create a new expense with percentage split', async () => {
      const response = await request(app)
        .post('/api/expenses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          amount: 100,
          description: 'Test Expense',
          splitMethod: 'percentage',
          participants: [{ user: userId, percentage: 100 }],
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.amount).toBe(100);
      expect(response.body.splitMethod).toBe('percentage');
    });

    it('should return 400 if percentages do not add up to 100', async () => {
      const response = await request(app)
        .post('/api/expenses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          amount: 100,
          description: 'Test Expense',
          splitMethod: 'percentage',
          participants: [{ user: userId, percentage: 90 }],
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Percentages must add up to 100%');
    });
  });
});