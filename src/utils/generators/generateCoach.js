const countMatches = require('./countMatches')

function generateCoach (data) {
    return {
      ...data,
      matchCount: countMatches(data.matches),
    }
  }

  module.exports = generateCoach