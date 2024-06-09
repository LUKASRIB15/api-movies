const knex = require('../database/knex')
const AppError = require('../utils/AppError')
class MovieNotesController{
  async create(request, response){
    const {title, description, rating, tags} = request.body
    const user_id = request.user.id

    const [note_id] = await knex("movieNotes").insert({
      title,
      description,
      rating,
      user_id
    })

    const movieTagsInsert = tags.map(tag=>{
      return {
        note_id,
        user_id,
        name: tag
      }
    })

    await knex("movieTags").insert(movieTagsInsert)

    return response.json()
  }

  async index(request, response){
    const user_id = request.user.id
    const {title, tags} = request.query

    let notes

    if(tags){
      const filteredTags = tags.split(",").map(tag=>tag.trim())
      notes = await knex("movieTags")
      .whereLike("movieNotes.title", `%${title}%`)
      .whereIn("movieTags.name", filteredTags)
      .innerJoin("movieNotes", "movieNotes.id", "movieTags.note_id")
    }else{
      notes = await knex("movieNotes")
      .where({user_id})
      .whereLike("title", `%${title}%`)
    }

    const userTags = await knex("movieTags").where({user_id}).orderBy("name")
    const notesWithTags = notes.map(note=>{
      const noteTags = userTags.filter(tag=>tag.note_id === note.id)

      const tags = noteTags.map(tag=>{
        return {
          id: tag.id,
          name: tag.name
        }
      })

      return {
        ...note,
        tags: tags
      }
    })

    return response.json(notesWithTags)
    
  }

  async show(request, response){
    const {id} = request.params

    console.log(id)

    const note = await knex("movieNotes")
    .where({id})
    .first()

    if(!note){
      throw new AppError("Note not found!", 404)
    }

    const tagsOfNote = await knex("movieTags").select(["id", "name"]).where({note_id: note.id})

    return response.json({
      ...note,
      tags: tagsOfNote
    })
  }

  async delete(request, response){
    const {id} = request.params

    await knex("movieNotes").where({id}).delete()

    return response.json()
  }
}

module.exports = MovieNotesController