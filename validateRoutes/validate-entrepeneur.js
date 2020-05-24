const db = require("../data/config-db");
const Entrepeneur = require("../models/entrepeneur-model");

function validateBody(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(400)
      .json({ errorMessage: "Please enter username and password" });
  } else {
    next();
  }
}

function validateId(req, res, next) {
  const { id } = req.params;
  Entrepeneur.findById(id)
    .then((user) => {
      if (user) {
        next();
      } else {
        res.status(404).json({ errorMessage: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "there was an error" });
    });
}

function validateProject(req, res, next) {
  const { name, description, background, city, state } = req.body;
  if (!name || !description || !background || !city || !state) {
    res.status(400).json({ errorMessage: "Please enter required information" });
  } else {
    next();
  }
}

function validateIdProject(req, res, next) {
  const { id, project_id } = req.params;
  Entrepeneur.findProjectById(project_id)
    .then((project) => {
      if (project) {
        console.log("here check ", project);
        next();
      } else {
        res.status(404).json({ errorMessage: "invalid project id" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "there was a problem finding that project" });
    });
}

module.exports = {
  validateBody,
  validateId,
  validateProject,
  validateIdProject,
};
