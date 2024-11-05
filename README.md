# Express Web Server

This project sets up an Express web server with essential middleware and routes, featuring:

- **Session Management**
- **Authentication** via OAuth through Passport (GitHub strategy)
- **CORS** (Cross-Origin Resource Sharing) configuration
- **MongoDB** database connection

## Setup

### Prerequisites

- **Node.js** installed on your machine
- **MongoDB** installed and running locally or accessible remotely

### Installation

1. **Clone** the repository containing this script.

2. **Install** dependencies:

   ```bash
   npm install express body-parser express-session passport passport-github2 cors mongodb
   ```

3. **Set up** environment variables required for GitHub OAuth:

   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `CALLBACK_URL`

## Usage

1. **Run** the script using Node.js:

   ```bash
   node server.js
   ```

2. The server will start listening on the specified port (default: 3000).

3. **Access** the routes defined in the script via HTTP requests.

## Features

- **Express Server:** Initializes an Express web server.
- **Body Parser:** Middleware to parse incoming request bodies.
- **Session Management:** Utilizes `express-session` for managing sessions.
- **Passport Middleware:** Integrates Passport for authentication.
- **GitHub OAuth:** Configures GitHub OAuth strategy for authentication.
- **CORS Configuration:** Sets up CORS to handle cross-origin requests.
- **Routes:** Defines routes for handling various requests.
- **Error Handling:** Includes error-handling middleware to catch and respond to errors.
- **Database Connection:** Initializes MongoDB database connection using the provided script (`./data/database.js`).

## Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository.
2. **Create** a new branch for your feature or bug fix.
3. **Commit** your changes.
4. **Push** the branch to your fork.
5. **Submit** a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE). 
