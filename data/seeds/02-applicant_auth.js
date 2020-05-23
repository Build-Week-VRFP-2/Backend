exports.seed = function (knex) {
  // Inserts seed entries
  return knex("applicant_auth").insert([
    { username: "applicant", password: "applicant" },
    { username: "patrick", password: "patrick" },
    { username: "maria", password: "maria" },
  ]);
};
