import { UnAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  // requestUser is req.user who was authenticated

  // console.log(typeof req.user.userId); // string
  // console.log(typeof job.createdBy); // object ie mongoose.Types.ObjectId

  // Idea is if we have a user of 'admin' role we want them access to perform updates on jobs that they did not create
  // if (requestUser.role === 'admin') return

  // If resource belongs the user then continue
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new UnAuthenticatedError("Not authorized to access this route");
};

export default checkPermissions;
