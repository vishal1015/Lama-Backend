
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// Create a new project
router.post('/users/:userId/projects', projectController.createProject);

// Get all projects for a user
router.get("/users/:userId/projects", projectController.getProjects);

// Update an existing project
router.put(
  "/users/:userId/projects/:projectId",
  projectController.updateProject
);

// Delete a project
router.delete(
  "/users/:userId/projects/:projectId",
  projectController.deleteProject
);

module.exports = router;

