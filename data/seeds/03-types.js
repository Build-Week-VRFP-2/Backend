exports.seed = function (knex) {
  // Inserts seed entries
  return knex("types").insert([
    { title: "this is the title for type one" },
    { title: "title for type num two" },
    { title: "title for type num three" },
  ]);
};
