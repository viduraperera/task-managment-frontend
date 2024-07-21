# Task Manager

This is a sample project that manage tasks. The project is built using Next.js with TypeScript, and styled using Bootstrap and SCSS.

## Features

- **Next.js**: Framework for server-rendered React applications.
- **TypeScript**: Type-safe JavaScript with static type definitions.
- **Bootstrap**: CSS framework for responsive design.
- **SCSS**: Syntactically awesome stylesheets.
- **Zod**: TypeScript-first schema declaration and validation.
- **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **Jest**: Delightful JavaScript testing framework with a focus on simplicity.

## Getting Started

### Cloning the Repository

1. First, clone the repository:

   ```bash
   git clone https://github.com/viduraperera/task-managment-frontend.git
   ```

2. Navigate to the Folder

   ```bash
   cd task-managment-frontend
   ```

### Running Locally

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

### Running with Docker

1. Build the Docker image:

   ```bash
   docker build -t task-managment-frontend .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 task-managment-frontend
   ```

The application will be available at `http://localhost:3000`.

## Scripts

- **`npm install`**: Installs the project dependencies.
- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm test`**: Runs the test suite.

## License

This project is licensed under the MIT License.
