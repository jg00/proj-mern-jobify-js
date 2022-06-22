import express from "express";
const router = express.Router();

import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobsController.js";

// /api/v1/jobs
router.route("/").get(getAllJobs).post(createJob);
router.route("/stats").get(showStats);
router.route("/:id").patch(updateJob).delete(deleteJob);

export default router;
