exports.seed = function (knex) {
  // Inserts seed entries
  return knex("applicant_criteria").insert([
    { applicant_id: 1, type_id: 1 },
    { applicant_id: 2, type_id: 2 },
    { applicant_id: 3, type_id: 3 },
  ]);
};
