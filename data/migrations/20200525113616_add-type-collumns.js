
exports.up = function(knex) {
    return knex.schema
        .table('investors', function(t){
            t.boolean('offers_capital').notNull().defaultTo(0)
            t.boolean('offers_resources').notNull().defaultTo(0)
            t.boolean('offers_mentorship').notNull().defaultTo(0)
        })
        .table('applicants', function(t){
            t.boolean('needs_capital').notNull().defaultTo(0)
            t.boolean('needs_resources').notNull().defaultTo(0)
            t.boolean('needs_mentorship').notNull().defaultTo(0)
        })
}      
exports.down = function(knex) {
    return knex.schema
        .table('investors', function(t){
            t.dropColumn('offers_capital')
            t.dropColumn('offers_resources')
            t.dropColumn('offers_mentorship')
        })
        .table('applicants', function(t){
            t.dropColumn('needs_capital')
            t.dropColumn('needs_resources')
            t.dropColumn('needs_mentorship')
        })
};
