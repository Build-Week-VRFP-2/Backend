exports.seed = function (knex) {
  // Inserts seed entries
  return knex("applicants").insert([
    {
      name: "applicant name",
      description: "this is the description for applicant",
      background: "background for applicant",
      city: "new york",
      state: "NY",
      applicant_auth_id: 1,
    },
    {
      name: "patric",
      description: "this is the description for patrick",
      background: "background for patrick",
      city: "new york",
      state: "NY",
      applicant_auth_id: 2,
    },
    {
      name: "maria",
      description: "this is the description for maria",
      background: "background for maria",
      city: "new york",
      state: "NY",
      applicant_auth_id: 3,
    },
  ]);
};
