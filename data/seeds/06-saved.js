exports.seed = function (knex) {
  // Inserts seed entries
  return knex("saved").insert([
    { investor_id: 1, applicant_id: 1 },
    { investor_id: 2, applicant_id: 2 },
    { investor_id: 3, applicant_id: 3 },
  ]);
};
