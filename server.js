import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config(); // will look for .env file in the root
import "express-async-errors"; // controllers will no longer need try..catch and next(err). Errors sent to global error handler even without the throw exception on our controller.
// import cors from "cors"; // note this allows any frontend (or domains we specify while setting up cors) applications of different origin to access our application.  We will instead use cra proxy approach for development instead.
import morgan from "morgan"; // logger

// `production build setup - es6 modules
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

// On Heroku NODE_ENV is 'production'
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// `production build setup - by default __dirname (current directory for the server) not automatically available with es6 modules unlike in commonjs (this is workaround)
const __dirname = dirname(fileURLToPath(import.meta.url));

// `production build setup - only when ready to deploy
// Purpose is to use express.static to serve up our react app and public assets
app.use(express.static(path.resolve(__dirname, "./client/build"))); // statics assets

// app.use(cors());
app.use(express.json()); // req.body

// security packages
app.use(helmet()); // secure headers
app.use(xss()); // sanitize input, prevent cross-site scripting attacks
app.use(mongoSanitize()); // prevent mongodb operator injection

// Api routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// `production build setup - after api routes
/*
  In the client index.html we have our react router.  Our react application is our front-end for our server.
  Every 'get' route that goes to our server, we want to point it to the index.html and from there
  the react router will do it's job
  
  This has to be after our app.use api routes because we don't want to have any conflicts.
  Again we are talking about only the get routes that go to our application but before
  we route them to the index.html we want to check whether any of them are to the api auth or
  job routes. If they are then we direct the user over there.

  Remember we have access to these routes below from our front-end application.
*/
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware); // handle all requests that do not match any of our current routes
app.use(errorHandlerMiddleware); // error handler handles all errors happening in the existing routes

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

/*
  package.json script notes:

  "client" spins up CRA server localhost:3000
  "server" localhost:5000
  "start" spins up server and the client ie our front-end in dev (not production version in client/build)

  Once on heroku (production) all we will want to do is run 'node server' and our index.html
  is served up from our client/build production front-end.
  Now we are no longer looking for localhost:3000 that served up our front-end app in dev.
  Now we directly go to localhost:5000 or our heroku url for our app.

  "scripts": {
    "build-client": "cd client && npm run build",
    "server": "nodemon server --ignore client",
    "client": "npm start --prefix client",
    "start": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\" "
  },
*/
