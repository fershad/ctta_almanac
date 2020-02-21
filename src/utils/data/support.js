const groq = require('groq')
const client = require('../sanityClient')
const countMatches = require('./countMatches')

function generateSupport (data) {
    return {
      ...data,
      eventCount: data.events.length,
    }
  }
  
  async function getSupportData () {
    const filter = groq`*[_type == "person" && !(_id in path("drafts.**")) && "support" in role]`
    const projection = groq`{
      ...,
      'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)},
      "events": *[_type == "event" && references(^._id)]{
          ...
      },
    }`
    const order = ``
    const query = [filter, projection, order].join(' ')
    const docs = await client.fetch(query).catch(err => console.error(err))
    const prepSupport = docs.map(generateSupport)
    return prepSupport
  }
  
  module.exports = getSupportData

  /* NOTES

  "matches": *[_type == "gamesTeam" && references(^._id)]
  --> This gets all the matches of each player. Can be wrapped in a count() function to veriy


  */