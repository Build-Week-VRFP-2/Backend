exports.seed = function (knex) {
  // Inserts seed entries
  return knex("investors").insert([
    {
      name: "lisa",
      description: "this is the description for lisa",
      city: "new york",
      state: "NY",
      investor_auth_id: 1,
    },
    {
      name: "jhon",
      description: "this is the description for jhon",
      city: "oregon",
      state: "NY",
      investor_auth_id: 2,
    },
    {
      name: "mark",
      description: "this is the description for mark",
      city: "texas",
      state: "TX",
      investor_auth_id: 3,
    },
  ]);
};
