const knex = require('../database/knex')

class MovieTagsController{
  async index(request, response){
    const {user_id} = request.params

    const tags = await knex("movieTags")
    .select(["id", "note_id", "name"])
    .where({user_id})
    .orderBy("name")

    return response.json(tags)
  }
}

module.exports = MovieTagsController