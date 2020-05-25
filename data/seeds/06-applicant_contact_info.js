exports.seed = function (knex) {
  // Inserts seed entries
  return knex("applicant_contact_info").insert([
    {
      email: "example1@gmai.com",
      phone_number: 1245896322,
      address: "new york new york",
      applicant_id: 1,
    },
    {
      email: "example2@gmai.com",
      phone_number: 1245896322,
      address: "new york new york",
      applicant_id: 2,
    },
    {
      email: "example3@gmai.com",
      phone_number: 1245896322,
      address: "new york new york",
      applicant_id: 3,
    },
  ]);
};
