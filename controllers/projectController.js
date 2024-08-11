const Project = require("../models/projectModel");
const User = require("../models/userModel");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    console.log(req.body); // Add this line for debugging
    const { userId } = req.params; // User ID from the URL
    const { projectName } = req.body; // Project details from the request body

    console.log(userId, projectName);

    // Find the user to ensure they exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the project
    const newProject = new Project({
      projectName,
      user: userId, // Associate the project with the user
    });

    // Save the project
    const savedProject = await newProject.save();

    // Optionally, you might want to add this project ID to the user's project list
    user.projects.push(savedProject._id);
    await user.save();

    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {

  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("projects");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { projectName } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { projectName },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Also remove the project reference from the user's projects array
    await User.findByIdAndUpdate(deletedProject.user, {
      $pull: { projects: projectId },
    });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
