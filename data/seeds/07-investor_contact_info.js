exports.seed = function (knex) {
  // Inserts seed entries
  return knex("investor_contact_info").insert([
    {
      email: "example1@gmai.com",
      phone_number: 1245896322,
      address: "new york new york",
      investor_id: 1,
    },
    {
      email: "example2mai.com",
      phone_number: 1245896322,
      address: "new york new york",
      investor_id: 2,
    },
    {
      email: "example3@gmai.com",
      phone_number: 1245896322,
      address: "new york new york",
      investor_id: 3,
    },
  ]);
};
