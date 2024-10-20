# Daily Expenses Sharing Application

This is a backend application for a daily-expenses sharing app that allows users to add expenses and split them based on three different methods: exact amounts, percentages, and equal splits.

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/daily-expenses-sharing-app.git
   cd daily-expenses-sharing-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy the `.env.example` file to `.env`
   - Update the `MONGODB_URI` and `JWT_SECRET` in the `.env` file

4. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### User Endpoints

- `POST /api/users/register`: Create a new user
- `POST /api/users/login`: Login user
- `GET /api/users/me`: Get current user details (requires authentication)

### Expense Endpoints

- `POST /api/expenses`: Add a new expense (requires authentication)
- `GET /api/expenses/user`: Get expenses for the current user (requires authentication)
- `GET /api/expenses/all`: Get all expenses (requires authentication)
- `GET /api/expenses/balance-sheet`: Download balance sheet (requires authentication)

## Testing

Run the test suite:

```
npm test
```

## Error Handling and Input Validation

- Input validation is implemented using Joi
- Error handling is implemented for all endpoints

## Performance Optimization

- Indexes are added to frequently queried fields in MongoDB schemas
- Pagination can be implemented for large datasets

## Authentication and Authorization

- JWT-based authentication is implemented
- Protected routes require a valid JWT token

## Future Improvements

- Implement more comprehensive test coverage
- Add pagination for expense listing endpoints
- Implement real-time updates using WebSockets
- Add more detailed documentation using tools like Swagger

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.