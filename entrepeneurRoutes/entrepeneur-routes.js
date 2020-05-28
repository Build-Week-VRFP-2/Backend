const express = require("express");
const Entrepeneur = require("../models/entrepeneur-model");
const {
  validateId,
  validateProject,
  validateIdProject,
} = require("../validateRoutes/validate-entrepeneur");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require("uuid");

const route = express.Router();

// POST /api/applicant/:id/project/payment
route.post("/:id/project/payment", (req, res) => {
  const { product, token } = req.body;

  const idempontencyKey = uuidv4();

  stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

// POST /api/applicant/:id/project
route.post("/:id/project", validateId, validateProject, (req, res) => {
  const { id } = req.params;

  Entrepeneur.addProject(req.body, id)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "there was an error here" });
    });
});

// GET /api/applicant/projects
route.get("/projects", (req, res) => {
  Entrepeneur.findAll()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "there was a problem while getting the projects",
      });
    });
});

// GET /api/applicant/:id/projects
route.get("/:id/projects", validateId, (req, res) => {
  const { id } = req.params;
  Entrepeneur.findProjects(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "there was an error" });
    });
});

// GET /api/applicant/:id/project/:project_id
route.get(
  "/:id/project/:project_id",
  validateId,
  validateIdProject,
  (req, res) => {
    const { id, project_id } = req.params;
    Entrepeneur.findApplicantProject(id, project_id)
      .then(([project]) => {
        res.status(200).json(project);
      })
      .catch({ errorMessage: "there was an error finding that project" });
  }
);

// PUT /api/applicant/:id/project/:project_id
route.put(
  "/:id/project/:project_id",
  validateId,
  validateIdProject,
  (req, res) => {
    const { id, project_id } = req.params;
    Entrepeneur.updateApplicantProject(id, project_id, req.body)
      .then((project) => {
        res.status(200).json({ success: "updated successfully" });
      })
      .catch((err) => {
        res.status(500).json({
          errorMessage: "there was an error updating the project information",
        });
      });
  }
);

// DELETE /api/applicant/:id/project/:project_id
route.delete(
  "/:id/project/:project_id",
  validateId,
  validateIdProject,
  (req, res) => {
    const { id, project_id } = req.params;
    Entrepeneur.removeApplicantProject(id, project_id)
      .then((project) => {
        res.status(200).json({ message: "project removed successfully" });
      })
      .catch((err) => {
        res.status(500).json({
          errorMessage: "there was an error while deleting the project",
        });
      });
  }
);

module.exports = route;
