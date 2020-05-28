exports.up = function (knex) {
  return knex.schema
    .table("investors", (table) => {
      table.string("image_url");
    })
    .table("applicants", (table) => {
      table.string("image_url");
    });
};

exports.down = function (knex) {
  return knex.schema.dropColumn("image_url");
};
