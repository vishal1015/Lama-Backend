const Project = require("../models/projectModel");
const User = require("../models/userModel");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    // console.log(req.body); 
    const { userId } = req.params; 
    const { projectName } = req.body; 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the project
    const newProject = new Project({
      projectName,
      user: userId, 
    });

    // Save the project
    const savedProject = await newProject.save();

    //add this project ID to the user's project list
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

    
    await User.findByIdAndUpdate(deletedProject.user, {
      $pull: { projects: projectId },
    });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
