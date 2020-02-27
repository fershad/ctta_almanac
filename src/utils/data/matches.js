const groq = require('groq')
const client = require('../sanityClient')
const generateMatches = require('../generators/generateMatches')


function generateMatch (data) {

    return {
      ...generateMatches(data)
    }
  }
  
  async function getTeamsData () {
    const filter = groq`*[_type == "gamesTeam" && !(_id in path("drafts.**"))]`
    const projection = groq`{
      ...,
      players[]{
        ...,
        playerName->{'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}}
      },
      event->{name}
    }`
    const order = ``
    const query = [filter, projection, order].join(' ')
    const docs = await client.fetch(query).catch(err => console.error(err))
    const prepMatches = docs.map(generateMatch)
    return prepMatches
  }
  
  module.exports = getTeamsData