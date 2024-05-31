# StarWars Planet Exploring

This project is a full-stack application that uses Node.js for the backend, React.js for the frontend, and MongoDB for database operations. The backend fetches data from the Star Wars API (SWAPI) and logs some data to MongoDB.

## Backend

The backend is built with Node.js and fetches data from the SWAPI (https://swapi.dev/). It provides endpoints that the frontend can use to retrieve Star Wars data. The backend also interacts with a MongoDB database to store and retrieve small logs.

## Frontend

The frontend is built with React.js. It communicates with the backend to fetch data and presents it to the user in a user-friendly format. The frontend includes features such as searching for planets, people, and starships.

## Database

The application uses MongoDB to store small logs. The logs are collected from the backend operations and are used for debugging and tracking purposes.

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Start the backend server with `npm run start-server` or `npm run start-server:dev`.
4. Start the frontend with `npm start`.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
