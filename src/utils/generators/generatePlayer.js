const countMatches = require('./countMatches')
const getMatchStats = require('./generateStats')
const generateMatches = require('./generateMatches')

function generatePlayer (data) {
    return {
      ...data,
      matchCount: countMatches(data.matches),
      matchStats: getMatchStats(data._id, data.matches),
      matches: data.matches.map(generateMatches),
      '150x': images(data.image).width(150).height(150).auto("format").url(),
      '300x': images(data.image).width(300).height(300).auto("format").url(),
      '600x': images(data.image).width(600).height(600).auto("format").url()
    }
  }

  module.exports = generatePlayer