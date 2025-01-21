## URL Shortener

A backend clone of Bitly for shortening URLs.

## Features

- Shorten long URLs
- Redirect to original URLs
- Track number of clicks

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Frontend (HTML,CSS,Javascript)
- Git

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/url-shortener.git
    ```
2. Navigate to the project directory:
    ```bash
    cd url-shortener
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables:
        ```
        PORT=3000
        MONGODB_URI=your_mongodb_connection_string
        BASE_URL=http://localhost:8001
        ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```
2. Use the API to shorten URLs:
    - POST `/api/shorten` with a JSON body containing the `longUrl`.
    - Example:
        ```json
        {
            "longUrl": "https://www.example.com"
        }
        ```


