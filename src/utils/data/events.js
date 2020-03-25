const groq = require('groq')
const client = require('../sanityClient')
const generateMatches = require('../generators/generateMatches')
const images = require('../generators/generateImages')

function generateEvent (data) {

    return {
      ...data,
      matches: data.matches.map(generateMatches),
      type: localizeType(data.type),
      referees: generateReferees(data.referees),
      '75x': images(data.image).width(75).height(75).auto("format").url(),
      '150x': images(data.image).width(150).height(150).auto("format").url(),
      '300x': images(data.image).width(300).height(300).auto("format").url()
    }
  }

  function localizeType(type) {
    let localized = []
    switch (type) {
      case "tournament":
        localized = {
          en: "tournament",
          tw: "聯賽"
        }
        break;
      case "series":
        localized = {
          en: "series",
          tw: "系列"
        }
        break;
      case "match":
        localized = {
          en: "series",
          tw: "比賽"
        }
        break;
    }

    return localized
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
          division->{'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}},
          event->{'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}},
          gameDate,
          opponent{'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}, score},
          taipeiScore,
      },
      "referees": *[_type == "gamesReferee" && references(^._id)] {
        ...,
        referee[]->{'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}},
        event->{'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)}}
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