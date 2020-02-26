const groq = require('groq')
const client = require('../sanityClient')
const generateMatches = require('../generators/generateMatches')

function generateEvent (data) {

    return {
      ...data,
      matches: data.matches.map(generateMatches),
      referees: generateReferees(data.referees)
    }
  }

  function generateReferees(data) {
    //console.log(JSON.stringify (data, null, 2))
    const events = [];
    const map = new Map();
    for (const item of data) {
        if(!map.has(item.event.name.en)){
            map.set(item.event.name.en, true);    // set any value to Map
            events.push({
                en: item.event.name.en,
                tw: item.event.name.tw
            });
        }
    }

    let referee = {
      ...data,
      "event": events
    }

    return referee
  }

  
  async function getEventData () {
    const filter = groq`*[_type == "event" && !(_id in path("drafts.**"))]`
    const projection = groq`{
      ...,
      'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)},
      "matches": *[_type == "gamesTeam" && references(^._id)] | order(gameDate desc) {
          _id,
          division->{name},
          event->{name},
          gameDate,
          opponent,
          taipeiScore,
      },
      "referees": *[_type == "gamesReferee" && references(^._id)] {
        ...,
        referee[]->{name},
        event->{name}
      }
    }`
    const order = `| order(year desc)`
    const query = [filter, projection, order].join(' ')
    const docs = await client.fetch(query).catch(err => console.error(err))
    const prepEvent = docs.map(generateEvent)
    //console.log(prepPlayers[9].name.en, prepPlayers[9].matchStats)
    //console.log("Referees:", JSON.stringify(prepEvent[1].referees[13].referee[0].name, null, 2))
    return prepEvent
  }
  
  module.exports = getEventData