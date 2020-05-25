const express = require("express");
const Contact = require("../models/applicant-contactInfo-model");
const {
  validateId,
  validateContact,
  validateEmail,
} = require("../validateRoutes/validate-entrepeneur");

const route = express.Router();

// POST /api/applicant/:id/contact
route.post(
  "/:id/contact",
  validateId,
  validateContact,
  validateEmail,
  (req, res) => {
    const { id } = req.params;

    Contact.addContact(id, req.body)
      .then((contact) => {
        res.status(201).json(contact);
      })
      .catch((error) => {
        res.status(500).json({
          errorMessage: "there was an error adding the contact information",
        });
      });
  }
);

// GET /api/applicant/:id/contact
route.get("/:id/contact", validateId, (req, res) => {
  const { id } = req.params;
  Contact.findContById(id)
    .then(([contact]) => {
      if (contact) {
        res.status(200).json(contact);
      } else {
        res
          .status(400)
          .json({ errorMessage: "there is no contact information" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: "there is no contact information for this applicant",
      });
    });
});

// PUT /api/applicant/:id/contact
route.put("/:id/contact", validateId, (req, res) => {
  const { id } = req.params;
  Contact.updateContact(id, req.body)
    .then((contact) => {
      res.status(200).json({ message: "successfully updated" });
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: "there is no contact information for this applicant",
      });
    });
});

// DELETE /api/applicant/:id/contact
route.delete("/:id/contact", validateId, (req, res) => {
  const { id } = req.params;
  Contact.removeContact(id)
    .then((contact) => {
      res.status(200).json({ message: "successfully deleted" });
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: "there is no contact information for this applicant",
      });
    });
});

module.exports = route;
