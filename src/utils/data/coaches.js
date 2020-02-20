const groq = require('groq')
const client = require('../sanityClient')
const countMatches = require('./countMatches')

function generateCoaches (data) {
    return {
      ...data,
      countMatches: countMatches(data.matches),
    }
  }
  
  async function getCoachesData () {
    const filter = groq`*[_type == "person" && !(_id in path("drafts.**")) && "coach" in role]`
    const projection = groq`{
      ...,
      "matches": *[_type == "gamesTeam" && references(^._id)]{
          ...
      }
    }`
    const order = ``
    const query = [filter, projection, order].join(' ')
    const docs = await client.fetch(query).catch(err => console.error(err))
    const prepCoaches = docs.map(generateCoaches)
    return prepCoaches
  }
  
  module.exports = getCoachesData

  /* NOTES

  "matches": *[_type == "gamesTeam" && references(^._id)]
  --> This gets all the matches of each player. Can be wrapped in a count() function to veriy


  */