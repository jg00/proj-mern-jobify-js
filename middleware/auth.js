import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid -");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = payload // you can pass in full payload or just the userId
    req.user = { userId: payload.userId };

    next();
  } catch (error) {
    // Catch unverified/tampered/expired tokens
    throw new UnAuthenticatedError("Authentication Invalid --");
  }
};

export default auth;

/* jwt.io, postman setup
  1. jwt.io
  Whenever the use wants to access a protected route or resource, the user agent
  (ie postman, frontend) should send the JWT, typically in the Authorization header
  using the Bearer schema.

  Authorization: Bearer <token>

  If the token is sent in the Authorization header, 
  Cross-Origin Resource Sharing (CORS) won't be an issue as it doesn't use cookies.

  2. Postman setup 
  - Go to Register or Login route > Test tab > Add code to receive response object
  > Set and create a global or environment variable with name (ex: "token") we expect to receive
  from a frontend request.

  - Test tab code
  const jsonData = pm.response.json()
  pm.globals.set("token", jsonData.token);

  - Set auth for every route where we want to send the "token" along with a request
  from a user agent (ex: postman, frontend)
*/
