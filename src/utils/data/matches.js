const groq = require('groq')
const client = require('../sanityClient')
//const generateMatches = require('./generateMatches')


function generateMatch (data) {

    return {
      ...data
    }
  }
  
  async function getTeamsData () {
    const filter = groq`*[_type == "gamesTeam" && !(_id in path("drafts.**"))]`
    const projection = groq`{
      ...,
      event->{name}
    }`
    const order = ``
    const query = [filter, projection, order].join(' ')
    const docs = await client.fetch(query).catch(err => console.error(err))
    const prepMatches = docs.map(generateMatch)
    return prepMatches
  }
  
  module.exports = getTeamsData