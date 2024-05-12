exports.up = knex=>knex.schema.alterTable("movieNotes", table=>{
  table.integer("user_id").references("id").inTable("users").alter()
})

exports.down = knex=>knex.schema.dropTable("movieNotes")
