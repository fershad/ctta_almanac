// My custom documents
import site from "./documents/site";
import person from "./documents/person";
import division from "./documents/division";
import event from "./documents/event";
import gamesTeam from "./documents/gamesTeam";
import gamesReferee from "./documents/gamesReferee";

// My custom content types
import localeExcerpt from "./contentTypes/localeExcerpt";
import localeString from "./contentTypes/localeString";
import localeArray from "./contentTypes/localeArray";
import playerStat from "./contentTypes/playerStat";
import personTeam from "./contentTypes/personTeam";

// Sanity Studio v3+ schema export
export const schemaTypes = [
  site,
  division,
  person,
  event,
  gamesTeam,
  gamesReferee,
  localeExcerpt,
  localeString,
  localeArray,
  playerStat,
  personTeam,
];

export default schemaTypes;
