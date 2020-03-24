// const {flag} = require('country-emoji');

const generateMatches = (match) => {
    let matchData
    const result = getResult(match.opponent.score, match.taipeiScore)

    matchData = {
        ...match,
        // flag: flag(match.opponent.name.en),
        "result": result
    }

    return matchData
}

const getResult = (opponent, taipei) => {
    let result = {}
    if (parseInt(opponent) < taipei) {
        result = {
            "en": "win",
            "tw": "贏"
        }
        return result
    } else if (parseInt(opponent) == taipei) {
        result = {
            "en": "draw",
            "tw": "平"
        }
        return result
    } else if (parseInt(opponent) > taipei) {
        result = {
            "en": "loss",
            "tw": "輸"
        }
        return result
    }
}

module.exports = generateMatches