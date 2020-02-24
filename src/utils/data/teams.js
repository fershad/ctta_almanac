const groq = require('groq')
const client = require('../sanityClient')

function generateTeam (data) {
    return {
      ...data,
      matches: data.matches.map(generateMatches)
    }
  }

  const generateMatches = (match) => {
      let matchData
      const result = getResult(match.opponent.score, match.taipeiScore)

      matchData = {
          ...match,
          "result": result
      }

      return matchData
  }

  const getResult = (opponent, taipei) => {
      if (parseInt(opponent) < taipei) {
          return "Win"
      } else if (parseInt(opponent) == taipei) {
          return "Draw"
      } else if (parseInt(opponent) > taipei) {
          return "Loss"
      }
  }
  
  async function getTeamsData () {
    const filter = groq`*[_type == "division" && !(_id in path("drafts.**"))]`
    const projection = groq`{
      ...,
      'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)},
      "matches": *[_type == "gamesTeam" && references(^._id)] | order(gameDate desc) {
          _id,
          division,
          event->{name},
          gameDate,
          opponent,
          taipeiScore
      }
    }`
    const order = ``
    const query = [filter, projection, order].join(' ')
    const docs = await client.fetch(query).catch(err => console.error(err))
    const prepTeams = docs.map(generateTeam)
    //console.log(prepPlayers[9].name.en, prepPlayers[9].matchStats)
    //console.log(JSON.stringify(prepTeams[0].matches[0], null, 2))
    return prepTeams
  }
  
  module.exports = getTeamsData