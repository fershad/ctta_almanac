const generateMatches = require('./generateMatches')
const images = require('./generateImages')

function generateCoach (data) {
    return {
      ...data,
      matchCount: getMatchCount(data._id, data.matches),
      matches: data.matches.map(generateMatches),
      '150x': images(data.image).width(150).height(150).auto("format").url(),
      '300x': images(data.image).width(300).height(300).auto("format").url(),
      '600x': images(data.image).width(600).height(600).auto("format").url()
    }
  }

  const getMatchCount = (id, matches) => {
    let matchCount = 0


    matches.forEach(match => {
      match.coaches.forEach(coach => {
         if (coach._ref == id) {
             matchCount += 1
            }
          });
        });

        return matchCount
  }

  module.exports = generateCoach