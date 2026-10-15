const groq = require("groq");
const client = require("../sanityClient");
const generatePlayer = require("../generators/generatePlayer");
const generateCoach = require("../generators/generateCoach");
const generateMatches = require("../generators/generateMatches");

function generateTeam(data) {
  return {
    ...data,
    matches: data.matches.map(generateMatches),
    players: data.players.map(generatePlayer),
    coaches: data.coaches.map(generateCoach),
  };
}

async function getTeamsData() {
  const filter = groq`*[_type == "division" && !(_id in path("drafts.**"))]`;
  const projection = groq`{
      ...,
      'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)},
      "matches": *[
        _type == "gamesTeam" &&
        !(_id in path("drafts.**")) &&
        division._ref == ^._id
      ] | order(gameDate desc) {
        _id,
        division,
        event->{name},
        gameDate,
        opponent,
        taipeiScore,
      },
      "players": *[
        _type == "person" &&
        !(_id in path("drafts.**")) &&
        player.isPlayer &&
        ^._id in player.division[]._ref
      ] {
        ...,
        'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)},
        "matches": *[
          _type == "gamesTeam" &&
          !(_id in path("drafts.**")) &&
          ^._id in players[].playerName._ref &&
          division._ref == ^.^._id
        ] | order(gameDate desc) {
          ...
        }
      },
      "coaches": *[
        _type == "person" &&
        !(_id in path("drafts.**")) &&
        coach.isCoach &&
        _id in *[
          _type == "gamesTeam" &&
          !(_id in path("drafts.**")) &&
          division._ref == ^.^._id
        ].coaches[]._ref
      ] {
        ...,
        'name': {'tw': coalesce(name.tw, name.en), 'en': coalesce(name.en, name.en)},
        "matches": *[
          _type == "gamesTeam" &&
          !(_id in path("drafts.**")) &&
          ^._id in coaches[]._ref &&
          division._ref == ^.^._id
        ] | order(gameDate desc) {
          ...
        }
      }
    }`;
  const order = ``;
  const query = [filter, projection, order].join(" ");
  const docs = await client.fetch(query).catch((err) => console.error(err));
  const prepTeams = docs.map(generateTeam);
  //console.log(prepPlayers[9].name.en, prepPlayers[9].matchStats)
  //console.log(JSON.stringify(prepTeams[0].coaches, null, 2))
  return prepTeams;
}

module.exports = getTeamsData;
