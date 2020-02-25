const generateMatches = (match) => {
    let matchData
    const result = getResult(match.opponent.score, match.taipeiScore)

    matchData = {
        ...match,
        "result": result
    }

    return matchData
}

const getResult = (opponent, taipei) => {
    if (parseInt(opponent) < taipei) {
        return "Win"
    } else if (parseInt(opponent) == taipei) {
        return "Draw"
    } else if (parseInt(opponent) > taipei) {
        return "Loss"
    }
}

module.exports = generateMatches