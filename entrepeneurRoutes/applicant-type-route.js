const express = require("express");
const Types = require("../models/applicant-type-model");

const route = express.Router();

route.post("/:id/types", (req, res) => {
  const { id } = req.params;
  Types.addType(req.body, id)
    .then((type) => {
      res.status(201).json(type);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "there was an error adding the type" });
    });
});

module.exports = route;

//06
// exports.seed = function (knex) {
//   // Inserts seed entries
//   return knex("saved").insert([
//     { investor_id: 1, applicant_id: 1 },
//     { investor_id: 2, applicant_id: 2 },
//     { investor_id: 3, applicant_id: 3 },
//   ]);
// };

//07
// exports.seed = function (knex) {
//   // Inserts seed entries
//   return knex("offerings").insert([
//     { investor_id: 1, type_id: 1 },
//     { investor_id: 2, type_id: 2 },
//     { investor_id: 3, type_id: 3 },
//   ]);
// };

//08

// exports.seed = function (knex) {
//   // Inserts seed entries
//   return knex("applicant_criteria").insert([
//     { applicant_id: 1, type_id: 1 },
//     { applicant_id: 2, type_id: 2 },
//     { applicant_id: 3, type_id: 3 },
//   ]);
// };
