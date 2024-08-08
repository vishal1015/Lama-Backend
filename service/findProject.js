
const findProject = (user) => {
  console.log("I am promise in finding project .");
  return new Promise(async (resolve, reject) => {
    try {
      const project = await user.projects;
      resolve(project);
    } catch (e) {
      console.log("ERROR: ", e.message);
      reject("project does't found ");
    }
  });
};

module.exports = findProject;