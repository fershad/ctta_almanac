const groq = require('groq')
const client = require('../sanityClient')
const countMatches = require('./countMatches')

function generateRefs (data) {
    return {
      ...data,
      matchCount: countMatches(data.matches),
    }
  }
  
  async function getRefsData () {
    const filter = groq`*[_type == "person" && !(_id in path("drafts.**")) && "referee" in role]`
    const projection = groq`{
      ...,
      'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)},
      "matches": *[_type == "gamesReferee" && references(^._id)]{
          ...
      }
    }`
    const order = ``
    const query = [filter, projection, order].join(' ')
    const docs = await client.fetch(query).catch(err => console.error(err))
    const prepRefs = docs.map(generateRefs)
    return prepRefs
  }
  
  module.exports = getRefsData

  /* NOTES

  "matches": *[_type == "gamesTeam" && references(^._id)]
  --> This gets all the matches of each player. Can be wrapped in a count() function to veriy


  */