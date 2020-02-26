const countMatches = require('./countMatches')

function generateReferee (data) {
    return {
      ...data,
      matchCount: countMatches(data.matches),
    }
  }

  module.exports = generateReferee