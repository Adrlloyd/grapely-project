# Backend Tests

This directory contains unit tests for the backend controllers and services.

## Test Structure

- `controllerTests/` - Unit tests for Express controllers
  - `authController.test.ts` - Tests for user registration and login
  - `wineController.test.ts` - Tests for wine recommendation logic
  - `randomController.test.ts` - Tests for random wine selection
  - TODO: searchController.test.ts

## Running Tests

remember to add 
"server/coverage/" 
to your server gitignore

```bash
# run all the test
npm test

# with a coverage report
npm run test:coverage
```

