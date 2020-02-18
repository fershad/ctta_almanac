// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// My custom documents
import site from './documents/site'
import person from './documents/person'
import division from './documents/division'
import event from './documents/event'
import gamesTeam from './documents/gamesTeam'
import gamesReferee from './documents/gamesReferee'

// My customer content types
import localeExcerpt from './contentTypes/localeExcerpt'
import localeString from './contentTypes/localeString'
import localeArray from './contentTypes/localeArray'
import playerStat from './contentTypes/playerStat'
import personTeam from './contentTypes/personTeam'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
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
    personTeam
  ])
})
