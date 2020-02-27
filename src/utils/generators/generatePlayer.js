const countMatches = require('./countMatches')
const getMatchStats = require('./generateStats')
const generateMatches = require('./generateMatches')

function generatePlayer (data) {
    return {
      ...data,
      matchCount: countMatches(data.matches),
      matchStats: getMatchStats(data._id, data.matches),
      matches: data.matches.map(generateMatches)
    }
  }

  module.exports = generatePlayer