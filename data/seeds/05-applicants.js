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
      needs_capital: 1,
      needs_resources: 1,
      needs_mentorship: 1
    },
    {
      name: "patric",
      description: "this is the description for patrick",
      background: "background for patrick",
      city: "new york",
      state: "NY",
      applicant_auth_id: 2,
      needs_capital: 0,
      needs_resources: 1,
      needs_mentorship: 0
    },
    {
      name: "maria",
      description: "this is the description for maria",
      background: "background for maria",
      city: "new york",
      state: "NY",
      applicant_auth_id: 3,
      needs_capital: 1,
      needs_resources: 1,
      needs_mentorship: 0
    },
  ]);
};
