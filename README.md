# Hospital Management System

## Introduction
This project is a Hospital Management System built using Node.js and Express. It provides APIs for managing hospitals, psychiatrists, and patients.

## Libraries/Frameworks Used
- **Express**: Used as the web application framework.
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **Serverless-HTTP (sls)**: Allows deploying the application as a serverless function.
- **Mongoose**: MongoDB object modeling for Node.js (assuming it's used based on the `connection` import).

## Database
- The project uses a MongoDB database, and the connection is established using the Mongoose library.
- For evaluating the task, you can find the database dump in the 'database' folder, including the schema and at least 50 records.

## Project Structure
- **Config**: Contains database connection configuration.
- **Middleware**: Includes the ErrorMiddleware for handling errors.
- **Routes**: Contains route definitions for hospitals, psychiatrists, and patients.
- **Uploads**: Serves static files from the 'uploads' directory.

## API Endpoints
- **GET /**: Welcome message.
- **GET /uploads/:filename**: Serve static files from the 'uploads' directory.
- **GET /hospitals, POST /hospitals, GET /hospitals/:id, PUT /hospitals/:id, DELETE /hospitals/:id**: CRUD operations for hospitals.
- **GET /psychiatrists, POST /psychiatrists, GET /psychiatrists/:id, PUT /psychiatrists/:id, DELETE /psychiatrists/:id**: CRUD operations for psychiatrists.
- **GET /patients, POST /patients, GET /patients/:id, PUT /patients/:id, DELETE /patients/:id**: CRUD operations for patients.

## Postman/Swagger Documentation
- [Postman Collection](https://documenter.getpostman.com/view/23313464/2s9YywddsF): Use this link to import the Postman collection and test the APIs.
- [Swagger Documentation](): Alternatively, you can find the Swagger documentation here.

## Running Locally
1. Clone the repository
2. Install dependencies using `npm install`
3. Set up the database connection in `Config/database.js`
4. Run the application using `npm start`

## Serverless Deployment
The application can be deployed as a serverless function using Serverless-HTTP. The serverless function is exported as `handler` in the `serverless.js` file.

### Deploy
1. Install Serverless globally using `npm install -g serverless`
2. Deploy the application using `serverless deploy`

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
