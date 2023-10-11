# News Aggregator RESTful API

This project demonstrates the creation of a RESTful API that allows users to fetch news articles from multiple sources based on their preferences. Users can register, sign in and get news, update preferences.

## Getting Started

To set up and run the project on your local machine, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/rajavarra/news-aggregator-api.git
   cd news-aggregator-api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Start the Server:**
   ```bash
   npm start
   ```
   or, start dev with nodemon
   ```bash
   npm run dev
   ```
   The API will be accessible at http://localhost:3000/api/v1.

## Endpoints

- **POST /register:** Register a new user.
- **POST /login:** Log in a user.
- **GET /news:** Fetch news articles based on the logged-in user's preferences.
- **PUT /news/preferences:** Update the news preferences for the logged-in user.
- **GET /news/preferences:** Retrieve the news preferences for the logged-in user.

## Data Storage

Users and Preferences are stored in-memory using an array as the data store. Data persistence is not implemented, so user data not saved between server restarts.

## Error Handling

The API includes proper error handling for invalid requests. Common HTTP status codes are used to indicate the result of each request:

- **200 OK**: Successful request.
- **201 Created**: Successfully created.
- **204 No Content**: Successfully deleted.
- **400 Bad Request**: Invalid request or validation error.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Server error.

## Input Validation

Input validation is implemented for user Register, Log in and update preferences. The following validations are applied:

- user email and password are required fields and must not be empty.
- preferences must be required and should be array of list.

## Testing

You can test the API using tools like Postman or Curl to ensure it works as expected. Use the provided endpoints and their respective HTTP methods to perform CRUD operations on tasks.

**Please refer the postman collection**:
[Postman Collection for News aggregator](https://github.com/rajavarra/news-aggregator-api/blob/main/news-api.postman_collection.json)
