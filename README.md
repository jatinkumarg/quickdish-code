# Quickdish

## Local Setup

- create `.env` based on `.env.example` and add-in all required credentials
- type `npm install` on root
- If you're using `nodemon` on local then run `npm run dev` on root otherwise run `npm run start` on root

## App Structure

- `App.js`: starting point of the Quickdish app
- `views`: contains code for frontend pages
- `controllers`: contains logic to control flow through the app lifecycle
- `models`: contains mongoose based models to communicate with mongodb databases
- `methods`: contains functions to use models for updating collections
- `routes`: contains logic to handle url routing and authorization middleware
- `services`: contains code for design patterns used through the app
- `auth`: contains logic to handle user sign-in authentication process

## Test user credentials:

- Name: `Test user`
- Email: `test@quickdish.com`
- Password: `testuser`