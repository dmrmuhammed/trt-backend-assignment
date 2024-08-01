# Project Documentation

## Introduction

This project provides a RESTful API for managing tasks with authentication.

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/dmrmuhammed/trt-backend-assignment.git`
2. Navigate to the project directory: `cd trt-backend-assignment`
3. Install dependencies: `npm install`
4. Start the server: `npm start`

## API Endpoints

The following API endpoints are available:

### Authentication

---

1. Register a new user:
   `      POST /auth/register`
   - Body:
     - "email": String, Required
     - "password": String, Required

---

2. Login an existing user:
   `      POST /auth/login`
   - Body:
     - "email": String, Required
     - "password": String, Required

---

### Tasks CRUD Operations

---

1. Retrieve all tasks:
   `      GET /tasks`
   - User must be authenticated.

---

2. Retrieve a specific task:
   `      GET /task/:id`
   - User must be authenticated.
   - Parameters:
     - "id": String, Required

---

3. Create a new task:
   `      POST /task`
   - User must be authenticated.
   - Body:
     - "title": String, Required
     - "description": String, Optional
     - "completed": Boolean, Default: false
     - "userId": From authenticated user

---

4. Update an existing task:
   `      PATCH /task/:id`
   - User must be authenticated.
   - Parameters:
     - "id": String, Required
   - Body:
     - "title": String, Optional
     - "description": String, Optional
     - "completed": Boolean, Optional
     - "userId": From authenticated user

---

5. Delete a task:
   `      DELETE /task/:id`
   - User must be authenticated.
   - Parameters:
     - "id": String, Required

---

## Conclusion

This documentation provides an overview of the TRT backend project and its API endpoints. Use this documentation as a guide to interact with the API and manage tasks effectively.
