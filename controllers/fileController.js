const File = require("../models/FileModel")
const Project = require("../models/projectModel");
const User = require("../models/userModel");

exports.createFile = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newFile = new File({ name, description, project: projectId });
    const savedFile = await newFile.save();

    project.files.push(savedFile._id);
    await project.save();

    res.status(201).json(savedFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).populate("files");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project.files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { name, description } = req.body;

    const updatedFile = await File.findByIdAndUpdate(
      fileId,
      { name, description },
      { new: true }
    );

    if (!updatedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(updatedFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteFile = async (req, res) => {
  try {
    const { fileId, projectId } = req.params;

    const deletedFile = await File.findByIdAndDelete(fileId);
    if (!deletedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    // remove the file reference from the project's files array
    await Project.findByIdAndUpdate(projectId, {
      $pull: { files: fileId },
    });

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    // Fetch the file and include both 'description' and 'name' fields
    const searchedFile = await File.findById(fileId).select("description name");

    if (!searchedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(searchedFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

