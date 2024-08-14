const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

// Create a new file
router.post(
  "/users/:userId/projects/:projectId/files",
  fileController.createFile
);

// Get all files in a project
router.get("/users/:userId/projects/:projectId/files", fileController.getFiles);

// Update an existing file
router.put(
  "/users/:userId/projects/:projectId/files/:fileId",
  fileController.updateFile
);

// Delete a file
router.delete(
  "/users/:userId/projects/:projectId/files/:fileId",
  fileController.deleteFile
);

// receve the file information
router.get(
  "/users/:userId/projects/:projectId/files/:fileId",
  fileController.getFile
);
module.exports = router;
