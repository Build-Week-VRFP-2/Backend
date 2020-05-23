exports.up = function (knex) {
  return knex.schema
    .createTable("investor_auth", (table) => {
      table.increments();
      table.string("username", 255).notNullable().unique();
      table.string("password", 255).notNullable();
    })
    .createTable("applicant_auth", (table) => {
      table.increments();
      table.string("username", 255).notNullable().unique();
      table.string("password", 255).notNullable();
    })
    .createTable("types", (table) => {
      table.increments();
      table.string("title", 255).notNullable();
    })
    .createTable("investors", (table) => {
      table.increments();
      table.string("name", 255).notNullable();
      table.string("description", 255).notNullable();
      table.string("city", 255).notNullable();
      table.string("state", 255).notNullable();
      table
        .integer("investor_auth_id")
        .unsigned()
        .notNullable()
        .references("investor_auth.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("applicants", (table) => {
      table.increments();
      table.string("name", 255).notNullable();
      table.string("description", 255).notNullable();
      table.string("background", 255).notNullable();
      table.string("city", 255).notNullable();
      table.string("state", 255).notNullable();
      table
        .integer("applicant_auth_id")
        .unsigned()
        .notNullable()
        .references("applicant_auth.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("saved", (table) => {
      table.increments();
      table
        .integer("investor_id")
        .unsigned()
        .notNullable()
        .references("investors.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("applicant_id")
        .unsigned()
        .notNullable()
        .references("applicants.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("offerings", (table) => {
      table.increments();
      table
        .integer("investor_id")
        .unsigned()
        .notNullable()
        .references("investors.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("type_id")
        .unsigned()
        .notNullable()
        .references("types.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("applicant_criteria", (table) => {
      table.increments();
      table
        .integer("applicant_id")
        .unsigned()
        .notNullable()
        .references("applicants.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("type_id")
        .unsigned()
        .notNullable()
        .references("types.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("applicant_criteria")
    .dropTableIfExists("offerings")
    .dropTableIfExists("saved")
    .dropTableIfExists("applicants")
    .dropTableIfExists("investors")
    .dropTableIfExists("types")
    .dropTableIfExists("applicant_auth")
    .dropTableIfExists("investor_auth");
};
