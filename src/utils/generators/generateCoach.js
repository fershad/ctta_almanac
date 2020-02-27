const generateMatches = require('./generateMatches')

function generateCoach (data) {
    return {
      ...data,
      matchCount: getMatchCount(data._id, data.matches),
      matches: data.matches.map(generateMatches)
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