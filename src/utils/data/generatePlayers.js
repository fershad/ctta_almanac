const countMatches = require('./countMatches')
const getMatchStats = require('./generateStats')

function generatePlayer (data) {
    return {
      ...data,
      matchCount: countMatches(data.matches),
      matchStats: getMatchStats(data._id, data.matches)
    }
  }

  module.exports = generatePlayer