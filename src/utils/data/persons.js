const groq = require('groq')
const client = require('../sanityClient')
const generatePlayer = require('../generators/generatePlayer')
const generateCoach = require('../generators/generateCoach')
const generateReferee = require('../generators/generateReferee')
const generateSupporter = require('../generators/generateSupporter')

function generatePerson(data) {
  return {
    players: data.players.map(generatePlayer),
    coaches: data.coaches.map(generateCoach),
    referees: data.referees.map(generateReferee),
    supporters: data.supporters.map(generateSupporter),
  }
}

  
  async function getPersonsData() {
    const filter = groq``
    const projection = groq`{
      'players': *[_type == "person" && !(_id in path("drafts.**")) && "player" in role] {
          ...,
          'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)},
          "matches": *[_type == "gamesTeam" && references(^._id)]{
              division->{'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}},
              event->{'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}},
              "opponent": {
                score,
                'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}
              },
              players,
              taipeiScore
          }
        },
        'coaches': *[_type == "person" && !(_id in path("drafts.**")) && "coach" in role] {
            ...,
            'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)},
            "matches": *[_type == "gamesTeam" && references(^._id)]{
              division->{'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}},
              event->{
                ...,
                'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}},
              "opponent": {
                score,
                'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}
              },
              coaches,
              taipeiScore
            }
          },
        'referees': *[_type == "person" && !(_id in path("drafts.**")) && "referee" in role] {
            ...,
            'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)},
            "matches": *[_type == "gamesReferee" && references(^._id)]{
                "awayTeam": {
                  score,
                'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}
                },
                "homeTeam": {
                  score,
                'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}
                },
                'division': {'tw': coalesce(division.tw, division.en), 'en': coalesce(division.en, division.en)},
                event->{
                  ...,
                  'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}},
                referee
            }
          },
        'supporters': *[_type == "person" && !(_id in path("drafts.**")) && "support" in role] {
            ...,
            'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)},
            "events": *[_type == "event" && references(^._id)]{
                ...
            }
          },
    }`
    const order = ``
    const query = [filter, projection, order].join(' ')
    const docs = await client.fetch(query).catch(err => console.error(err))
    const prepPersons = generatePerson(docs)
    //console.log(prepPlayers[9].name.en, prepPlayers[9].matchStats)
    //console.log(JSON.stringify(prepPlayers[3], null, 2))
    //console.log(JSON.stringify (prepPersons.coaches[1], null, 2))
    return prepPersons
  }
  
  module.exports = getPersonsData

  /* NOTES

  "matches": *[_type == "gamesTeam" && references(^._id)]
  --> This gets all the matches of each player. Can be wrapped in a count() function to veriy


  */