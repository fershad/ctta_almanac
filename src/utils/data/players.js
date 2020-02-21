const groq = require('groq')
const client = require('../sanityClient')
const countMatches = require('./countMatches')
const getMatchStats = require('./generateStats')

function generatePlayer (data) {
    return {
      ...data,
      matchCount: countMatches(data.matches),
      matchStats: getMatchStats(data._id, data.matches)
    }
  }
  
  async function getPlayersData () {
    const filter = groq`*[_type == "person" && !(_id in path("drafts.**")) && "player" in role]`
    const projection = groq`{
      ...,
      'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)},
      "matches": *[_type == "gamesTeam" && references(^._id)]{
          ...
      }
    }`
    const order = ``
    const query = [filter, projection, order].join(' ')
    const docs = await client.fetch(query).catch(err => console.error(err))
    const prepPlayers = docs.map(generatePlayer)
    //console.log(prepPlayers[9].name.en, prepPlayers[9].matchStats)
    //console.log(JSON.stringify(prepPlayers[3], null, 2))
    return prepPlayers
  }
  
  module.exports = getPlayersData

  /* NOTES

  "matches": *[_type == "gamesTeam" && references(^._id)]
  --> This gets all the matches of each player. Can be wrapped in a count() function to veriy


  */