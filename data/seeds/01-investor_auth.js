exports.seed = function (knex) {
  // Inserts seed entries
  return knex("investor_auth").insert([
    { username: "lisa", password: "lisapass" },
    { username: "jhon", password: "jondoe" },
    { username: "mark", password: "mark" },
  ]);
};
