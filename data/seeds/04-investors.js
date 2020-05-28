exports.seed = function (knex) {
  // Inserts seed entries
  return knex("investors").insert([
    {
      name: "lisa",
      description: "this is the description for lisa",
      city: "new york",
      state: "NY",
      image_url: "",
      investor_auth_id: 1,
      offers_capital: 1,
      offers_resources: 1,
      offers_mentorship: 1,
    },
    {
      name: "jhon",
      description: "this is the description for jhon",
      city: "oregon",
      state: "NY",
      image_url: "",
      investor_auth_id: 2,
      offers_capital: 1,
      offers_resources: 0,
      offers_mentorship: 0,
    },
    {
      name: "mark",
      description: "this is the description for mark",
      city: "texas",
      state: "TX",
      image_url: "",
      investor_auth_id: 3,
      offers_capital: 0,
      offers_resources: 0,
      offers_mentorship: 1,
    },
  ]);
};
