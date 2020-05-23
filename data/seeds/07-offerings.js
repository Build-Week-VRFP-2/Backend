exports.seed = function (knex) {
  // Inserts seed entries
  return knex("offerings").insert([
    { investor_id: 1, type_id: 1 },
    { investor_id: 2, type_id: 2 },
    { investor_id: 3, type_id: 3 },
  ]);
};
